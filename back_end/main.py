import json
import threading
import numpy as np
from scipy.interpolate import interp1d
from flask import Flask, render_template, request

from siriuspy.clientarch import PVDataSet, Time
from siriuspy.clientconfigdb import ConfigDBDocument

import calc_signatures

app = Flask(__name__)

# Dictionary of families
family_dict = {
    'C': 'Corrector',
    'B': 'Dipole',
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


# Read the response matrix from SOFB
def read_respmat():
    """."""
    cdb = ConfigDBDocument(config_type='si_orbcorr_respm')
    cdb.name = 'ref_respmat'
    cdb.load()
    respm = np.array(cdb.value)
    return respm


# Update the interval used to fetch the pv value
def update_time_stamp(pvds, time_ref, interval):
    if Time.now() > (time_ref + interval):
        pvds.time_start = time_ref - interval
        pvds.time_stop = time_ref + interval
    else:
        pvds.time_start = time_ref - interval
        pvds.time_stop = time_ref
    pvds.update()


# Read several PVs from archiver
def read_archiver(pvnames, time_ref):
    """."""
    pvds = PVDataSet(pvnames)
    pvds.timeout = 20
    data = dict()
    for pvname in pvnames:
        interval = 10
        while interval < 1500:
            update_time_stamp(pvds, time_ref, interval)
            tstmp = np.array(pvds[pvname].timestamp)
            value = np.array(pvds[pvname].value)
            if value is None or not (tstmp[0] <= time_ref.timestamp() <= tstmp[-1]):
                # print('Could not find data at reference time at '+time_ref.strftime("%m/%d/%Y, %H:%M:%S")+' within '+str(interval)+'s window!')
                interval *= 2
                time_ref -= 3*interval/2
            else:
                break
        if len(value) > 2:
            func = interp1d(tstmp, value, axis=0, fill_value='extrapolate')
            value_fit = func(time_ref.timestamp())
        else:
            value_fit = value[0]
        data[pvname] = value_fit
    return data


# Get the difference between the values read on the start and stop time
def get_wfm_diff(pvnames, time_start, time_stop):
    """."""
    data_start = read_archiver(pvnames, time_start)
    data_stop = read_archiver(pvnames, time_stop)
    datax = data_stop[pvnames[0]] - data_start[pvnames[0]]
    datay = data_stop[pvnames[1]] - data_start[pvnames[1]]
    return datax, datay


# Read the Kicks from the CHs, CVs and the RF and the Orbit X and Y from Archiver
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


def corr_per_group(cod_rebuilt, data, corrdata, kick_axis=None):
    for group in data:
        for maname in data[group]:
            datum = data[group][maname]
            codx, cody = np.array(datum['codx']), np.array(datum['cody'])
            codx, cody = normalized_array(codx), normalized_array(cody)
            codx_r = normalized_array(cod_rebuilt[:160])
            cody_r = normalized_array(cod_rebuilt[160:])
            corrx = np.dot(codx, codx_r)
            corry = np.dot(cody, cody_r)
            magnet_type = family_dict[group[:1]]
            corrdata[maname+kick_axis] = (
                magnet_type, kick_axis, corrx, corry)
    return corrdata

# Calculate the correlation of the Signature orbits with the COD Rebuild
def calc_correlation(cod_rebuilt, signature_files, read_json=False):
    """."""

    corrdata = dict()
    for kick_axis in ['X', 'Y']:
        if read_json:
            for fname in signature_files:
                data = load_json(fname+kick_axis)
                corrdata = corr_per_group(
                    cod_rebuilt, data['groups'], corrdata, kick_axis)
        else:
            data = app.SIGNATURES['groups-'+kick_axis]
            corrdata = corr_per_group(
                cod_rebuilt, data, corrdata, kick_axis)
    return corrdata


# Get formatted time from URL
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


# Calculate the COD Rebuild
def calc_cod_rebuilt():
    time_start, time_stop = get_time()
    kick_rf, cod = read_data_from_archiver(time_start, time_stop)
    # read respmat from configdb
    sofb_mat = read_respmat()
    # reconstruct orbit distortion from archived kicks difference
    cod_rebuilt = cod - np.dot(sofb_mat, kick_rf)

    return cod_rebuilt


# Normalize an array
def normalized_array(array):
    norm = np.linalg.norm(array)
    if norm == 0:
        return np.array(array)
    return array/norm


# Read the signature CODX and CODY
def read_signatures(elem_data, read_json=False):
    if read_json:
        sign_madata = load_json(elem_data[2]+"_kick"+elem_data[1])
        groups_sign = sign_madata['groups']
    else:
        sign_madata = app.SIGNATURES
        groups_sign = sign_madata['groups-'+elem_data[1]]

    for group in groups_sign:
        if elem_data[0] in groups_sign[group]:
            orbit_sign = groups_sign[group][elem_data[0]]
            return [
                normalized_array(
                    orbit_sign['codx']).tolist(),
                normalized_array(
                    orbit_sign['cody']).tolist()]
    return []


# Returns the list of signature with the information
# about the correlation with the COD Rebuilt
@app.route("/sign_comp", methods=["GET"])
def signComp():

    signature_files = [
            'C_kick', 'D_kick',
            'Q_kick', 'S_kick'
    ]

    read_json = True#not app.SIGNATURES
    cod_rebuilt = calc_cod_rebuilt()
    corr = calc_correlation(
        cod_rebuilt, signature_files, read_json)
    return corr


# Returns the CODX and CODY of the COD Rebuilt
# and the signatures select on the URL
@app.route("/sign_orbit", methods=["GET"])
def signOrbit():
    sign_orbit = dict()

    read_json = True #not app.SIGNATURES
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

            sign_orbit[elem_name] = read_signatures(
                elem_data, read_json)

    return sign_orbit


def run_job():
    print("Initializing!")
    app.SIGNATURES = calc_signatures.calc_sign()


@app.before_first_request
def before_first_request():
    thread = threading.Thread(target=run_job)
    thread.start()


# Returns the page with the information about the URL Request
@app.route("/")
def home():
    return render_template('index.html')


if __name__ == "__main__":
    app.SIGNATURES = {}
    app.run(host="127.0.0.1", port=8080, debug=True)
