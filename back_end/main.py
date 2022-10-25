import json
import math as _math
import numpy as np
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
from flask import Flask, render_template, request

from siriuspy.clientarch import PVDataSet, Time
from siriuspy.clientconfigdb import ConfigDBDocument

from pymodels import si

app = Flask(__name__)

family_dict = {
  'C': 'Corrector',
  'D': 'Dipole',
  'Q': 'Quadrupole',
  'S': 'Sextupole'
}

# Load a dictionary from a json file
def load_json(filename):
  file = open('./data_sim/'+filename+'.json', "r")
  data = json.loads(file.read())
  file.close()
  return data


def read_respmat():
  """."""
  cdb = ConfigDBDocument(config_type='si_orbcorr_respm')
  cdb.name = 'ref_respmat'
  cdb.load()
  respm = np.array(cdb.value)
  return respm


def update_time_stamp(pvds, time_ref, interval):
  if Time.now() > (time_ref + interval):
    pvds.time_start = time_ref - interval
    pvds.time_stop = time_ref + interval
  else:
    pvds.time_start = time_ref - interval
    pvds.time_stop = time_ref
  pvds.update()

def read_archiver(pvnames, time_ref):
  """."""
  interval = 5
  pvds = PVDataSet(pvnames)
  pvds.timeout = 20
  update_time_stamp(pvds, time_ref, interval)
  data = dict()
  for pvname in pvnames:
    while interval < 1500:
      tstmp = np.array(pvds[pvname].timestamp)
      value = np.array(pvds[pvname].value)
      if (not (tstmp[0] <= time_ref.timestamp() <= tstmp[-1])) or len(value)<2:
        print('Could not find data at reference time at '+time_ref.strftime("%m/%d/%Y, %H:%M:%S")+' within '+str(interval)+'s window!')
        interval *= 2
        time_ref -= interval/2
        update_time_stamp(pvds, time_ref, interval)
      else:
        break
    func = interp1d(tstmp, value, axis=0)
    value_fit = func(time_ref.timestamp())
    data[pvname] = value_fit
  return data


def get_wfm_diff(pvnames, time_start, time_stop):
  """."""
  data_start = read_archiver(pvnames, time_start)
  data_stop = read_archiver(pvnames, time_stop)
  datax = data_stop[pvnames[0]] - data_start[pvnames[0]]
  datay = data_stop[pvnames[1]] - data_start[pvnames[1]]
  return datax, datay


def read_data_from_archiver(time_start, time_stop):
  """."""
  pvnames = ['SI-Glob:AP-SOFB:KickCH-Mon', 'SI-Glob:AP-SOFB:KickCV-Mon']
  kickx, kicky = get_wfm_diff(pvnames, time_start, time_stop)
  pvnames = ['SI-Glob:AP-SOFB:SlowOrbX-Mon', 'SI-Glob:AP-SOFB:SlowOrbY-Mon']
  codx, cody = get_wfm_diff(pvnames, time_start, time_stop)

  pvnames = ['RF-Gen:GeneralFreq-RB', 'RF-Gen:GeneralFreq-RB']
  rfx, rfy = get_wfm_diff(pvnames, time_start, time_stop)

  kicks = np.append(kickx, kicky)
  kick_rf = np.append(kicks, rfx)
  codx = codx[:160]
  cody = cody[:160]
  cod = np.append(codx, cody)

  return kick_rf, cod

def calc_correlation(cod_rebuilt, signature_files):
    """."""
    corrdata = dict()
    for kick_axis in ['X', 'Y']:
      for fname in signature_files:
          data = load_json(fname+kick_axis)
          data = data['groups']
          for group in data:
              for maname in data[group]:
                  datum = data[group][maname]
                  codx, cody = np.array(datum['codx']), np.array(datum['cody'])
                  codx, cody = normalized_array(codx), normalized_array(cody)
                  codx_r = normalized_array(cod_rebuilt[:160])
                  cody_r = normalized_array(cod_rebuilt[160:])
                  corrx = np.dot(codx, codx_r)
                  corry = np.dot(cody, cody_r)
                  corrdata[maname+kick_axis] = (
                    family_dict[fname[:1]], kick_axis, corrx, corry)
    return corrdata


def get_time():
    """."""
    start_date_str = request.args.get("start")
    stop_date_str = request.args.get("stop")
    date_format = "%Y-%m-%dT%H:%M:%S.%fZ"

    time_start = Time.strptime(
        start_date_str, date_format) - 10800
    time_stop = Time.strptime(
        stop_date_str, date_format) - 10800
    return time_start, time_stop


def calc_cod_rebuilt():
  time_start, time_stop = get_time()
  kick_rf, cod = read_data_from_archiver(time_start, time_stop)
  # read respmat from configdb
  sofb_mat = read_respmat()
  # reconstruct orbit distortion from archived kicks difference
  cod_rebuilt = cod - np.dot(sofb_mat, kick_rf)

  return cod_rebuilt


def normalized_array(array):
  norm = np.linalg.norm(array)
  if norm == 0:
    return np.array(array)
  return array/norm


def read_signature_from_file(elem_data):
  sign_madata = load_json(elem_data[2]+"_kick"+elem_data[1])
  groups_sign = sign_madata['groups']
  for group in groups_sign:
    if elem_data[0] in groups_sign[group]:
      orbit_sign = groups_sign[group][elem_data[0]]
      return [
        normalized_array(
          orbit_sign['codx']).tolist(),
        normalized_array(
          orbit_sign['cody']).tolist()]
  return []

@app.route("/sign_comp", methods=["GET"])
def signComp():

    signature_files = [
        'C_kick', 'D_kick',
        'Q_kick', 'S_kick'
    ]

    cod_rebuilt = calc_cod_rebuilt()
    corr = calc_correlation(cod_rebuilt, signature_files)
    return corr

@app.route("/sign_orbit", methods=["GET"])
def signOrbit():
    sign_orbit = dict()

    start_date_str = request.args.get("start")
    stop_date_str = request.args.get("stop")
    data = request.args.get("data")
    data = data.split(',')
    cod_rebuilt = calc_cod_rebuilt()

    sign_orbit['cod_rebuilt'] = [
      normalized_array(cod_rebuilt[:160]).tolist(),
      normalized_array(cod_rebuilt[160:]).tolist()]

    if 'cod_rebuilt' not in data:
      for name in data:
        elem_data = name.split("_")
        elem_name = elem_data[0] + elem_data[1]
        sign_orbit[elem_name] = read_signature_from_file(elem_data)
    return sign_orbit

@app.route("/")
def home():
  return render_template('index.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8081, debug=True)
