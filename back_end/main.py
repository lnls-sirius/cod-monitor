import json
import math as _math
import numpy as np
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt
from flask import Flask, render_template, url_for, redirect, request


from siriuspy.clientarch import PVDataSet, Time
from siriuspy.clientconfigdb import ConfigDBDocument

from pymodels import si

app = Flask(__name__)


# Normalization function
def normalize(list1):
  sumEle = sum(list1**2)
  if sumEle != 0:
    return list1 / _math.sqrt(sumEle)
  else:
    return list1


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


def read_archiver(pvnames, time_ref):
  """."""
  pvds = PVDataSet(pvnames)
  pvds.time_start = time_ref - 5
  pvds.time_stop = time_ref + 5
  pvds.update()

  data = dict()
  for pvname in pvnames:
    tstmp = np.array(pvds[pvname].timestamp)
    value = np.array(pvds[pvname].value)
    if not tstmp[0] <= time_ref.timestamp() <= tstmp[-1]:
      raise ValueError('Could not find data at reference time within 10s window!')
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
  codx = codx[:160]
  cody = cody[:160]

  pvnames = ['RF-Gen:GeneralFreq-RB', 'RF-Gen:GeneralFreq-RB']
  rfx, rfy = get_wfm_diff(pvnames, time_start, time_stop)

  kicks = np.append(kickx, kicky)
  kick_rf = np.append(kicks, rfx)
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
                  codx, cody = normalize(codx), normalize(cody)
                  codx_r = normalize(cod_rebuilt[:160])
                  cody_r = normalize(cod_rebuilt[160:])
                  corrx = np.dot(codx, codx_r) * 100
                  corry = np.dot(cody, cody_r) * 100
                  corrdata[maname+kick_axis] = (fname+kick_axis, corrx, corry)
    return corrdata


@app.route("/sign_comp", methods=["GET"])
def signComp():
    start_date_str = request.args.get("start")
    stop_date_str = request.args.get("stop")

    signature_files = [
        'C_kick', 'D_kick',
        'Q_kick', 'S_kick'
    ]

    date_format = "%Y-%m-%dT%H:%M:%S.%fZ"
    time_start = Time.strptime(
        start_date_str, date_format)
    time_stop = Time.strptime(
        stop_date_str, date_format)
    kick_rf, cod = read_data_from_archiver(time_start, time_stop)

    # read respmat from configdb
    sofb_mat = read_respmat()
    # # reconstruct orbit distortion from archived kicks difference
    cod_rebuilt =  cod - np.dot(sofb_mat, kick_rf)

    corr = calc_correlation(cod_rebuilt, signature_files)

    return corr


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8081, debug=True)
