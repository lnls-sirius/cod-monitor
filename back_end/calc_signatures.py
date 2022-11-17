#!/usr/bin/env python-sirius
import numpy as np
import json
import pyaccel
from pymodels import si

DEF_KICK = 5e-6

CORRECTORS = [
    'CH', 'CV',
    ]
DIPOLES = [
    'B1', 'B2', 'BC'
    ]
QUADRUPOLES = [
    'QFA', 'QDA', 'QDB2', 'QFB', 'QDB1',
    'Q1', 'Q2', 'Q3', 'Q4',
    ]
SEXTUPOLES_WOCORRS = [
    'SDA2', 'SDB2', 'SFA0',
    'SFA1', 'SFB1', 'SDB0'
    ]
SEXTUPOLES_CORRS = [
    'SDA0', 'SFB0', 'SDA1', 'SDB1', 'SDA3',
    'SDB3', 'SFA2', 'SFB2', 'FCH',
    ]

GROUPS = list()
GROUPS.extend(CORRECTORS)
GROUPS.extend(DIPOLES)
GROUPS.extend(QUADRUPOLES)
GROUPS.extend(SEXTUPOLES_WOCORRS)

# Normalize function
def normalize(rx_list, kick):
    return rx_list / kick


# Format orbit to data only measured on the BPM positions
def mesuredByBPM(meas_pos, spos, rx):
    orbit_list = []
    for mesurement in meas_pos:
        idx_meas = spos.index(mesurement)
        orbit_list = np.append(orbit_list, rx[idx_meas])
    return orbit_list


# Give a vertical or horizontal kick
def kickElem(model, elem_idx, kick, axis):
    """."""
    # [rad]
    if axis == 'y':
        model[elem_idx].vkick_polynom = kick
    else:
        model[elem_idx].hkick_polynom = kick


# Format and normalize axis
def formatTwissData(bpm_positions, axis, spos, kick):
    axis_norm = normalize(axis, kick)
    return mesuredByBPM(
        bpm_positions, list(spos), axis_norm)


def calcKickSeg(idx, angle, length):
    total_field = 0
    kick_list = []
    for id_seg in range(0, len(idx)):
        mag_field = angle[id_seg]/length[id_seg]
        kick = DEF_KICK * np.abs(mag_field)
        total_field += np.abs(mag_field)
        kick_list = np.append(kick_list, kick)
    return total_field, kick_list


def calcOrbit(model, bpm_positions, kick):
    twiss, *_ = pyaccel.optics.calc_twiss(model)
    rx_meas = formatTwissData(bpm_positions, twiss.rx, twiss.spos, kick)
    ry_meas = formatTwissData(bpm_positions, twiss.ry, twiss.spos, kick)
    return rx_meas, ry_meas


# Calculate the orbit distortion of a dipole
def setOrbitDist(model, idx, axis, has_segments):
    if has_segments:
        count = 0
        seg_angle = pyaccel.lattice.get_attribute(model, 'angle', idx)
        seg_length = pyaccel.lattice.get_attribute(model, 'length', idx)
        total_field, kick_list = calcKickSeg(idx, seg_angle, seg_length)
        for id_di in idx:
            kick = kick_list[count]/total_field
            kickElem(model, id_di, kick, axis)
            count += 1
    else:
        kick = DEF_KICK
        kickElem(model, idx, kick, axis)

    return model


def unsetOrbitDist(model, idx, axis, has_segments):
    if has_segments:
        for id_di in idx:
            kickElem(model, id_di, 0, axis)
    else:
        kickElem(model, idx, 0, axis)
    return model


# Save one orbit to a dict
def saveOrbitDict(devData, r_meas, axis):
    key_name = 'cod'+axis
    devData[key_name] = r_meas.tolist()


# Write a JSON File with the signature information
def writeJson(dictionary, axis, fam_letter):
    if fam_letter == 'B':
        fam_letter = 'D'
    jsonFile = open("./data_sim/"+fam_letter+"_kick"+axis.upper()+".json", "w")
    jsonString = json.dumps(dictionary)
    jsonFile.write(jsonString)
    jsonFile.close()


def getCod(model, data, ele_idx, dev_fam, axis_kick, stren_kick, bpm_positions):
    r_meas = {'x': [], 'y': []}
    for idx, idx_e in enumerate(ele_idx):
        model = setOrbitDist(
            model, idx_e, axis_kick, (dev_fam in DIPOLES))
    r_meas['x'], r_meas['y'] = calcOrbit(
        model, bpm_positions, stren_kick)
    for idx, idx_e in enumerate(ele_idx):
        model = unsetOrbitDist(
            model, idx_e, axis_kick, (dev_fam in DIPOLES))
    # Save verical or horizontal orbit
    for axis in ['x', 'y']:
        saveOrbitDict(
            data, r_meas[axis], axis)
    return data

def elementSignature(
        model, famdata, bpm_positions, dev_fam, axis_kick):
    # Save family to Dictionary
    data = {}
    famData = data
    family = famdata[dev_fam]
    # Calculate distorted orbit on the elements
    if dev_fam in DIPOLES:
        ele_idx = np.asarray(family['index'])
    else:
        ele_idx = np.asarray(family['index']).ravel()
    # Loop the elements in the Families
    for idx, idx_e in enumerate(ele_idx):
        print(axis_kick, dev_fam, idx_e)
        # Save element
        if dev_fam in DIPOLES:
            subsec = family['subsection'][idx]
            dev_name = "SI-" + subsec + ":MA-" + dev_fam
        else:
            dev_name = family['devnames'][idx].replace(':PS', ':MA')
        famData[dev_name] = {}
        famData[dev_name] = getCod(
            model, famData[dev_name], [idx_e], dev_fam, axis_kick,
            DEF_KICK, bpm_positions)

    return data

def famSignature(model, famdata, bpm_positions, dev_fam, axis_kick):
    print(dev_fam)
    # Save family to Dictionary
    data = {}
    family = famdata[dev_fam]
    # Calculate distorted orbit on the elements
    if dev_fam in DIPOLES:
        ele_idx = np.asarray(family['index'])
    else:
        ele_idx = np.asarray(family['index']).ravel()
    data = getCod(
        model, data, ele_idx, dev_fam, axis_kick,
        DEF_KICK*len(ele_idx), bpm_positions)
    return data


def calc_sign(write_json=False):

    model = si.create_accelerator()
    famdata = si.get_family_data(model)
    codData = {
        "unit": "um/urad",
        "bpm_names": {}
    }
    act_fam = ''

    # get BPM Information
    bpm_fam = famdata['BPM']
    bpm_idx = np.asarray(bpm_fam['index']).ravel()
    bpm_dev = bpm_fam['devnames']

    twiss, *_ = pyaccel.optics.calc_twiss(model)
    bpm_positions = twiss.spos[bpm_idx]
    codData["bpm_names"] = bpm_dev
    group_name = "groups-X"

    # Give a kick in both axis
    for axis_kick in ['x', 'y']:
        if axis_kick == 'y':
            group_name = "groups-Y"

        if not write_json:
            codData[group_name] = {}
        # Loop the Families
        for dev_fam in GROUPS:
            if dev_fam[:1] != act_fam and write_json:
                group_name = "groups"
                codData[group_name] = {}
                act_fam = dev_fam[:1]

            if(not ((axis_kick == 'x' and dev_fam == 'CV') or
                    (axis_kick == 'y' and dev_fam == 'CH'))):
                codData[group_name][dev_fam] = elementSignature(
                    model, famdata, bpm_positions, dev_fam, axis_kick)
                if dev_fam not in CORRECTORS:
                    codData[group_name][dev_fam][dev_fam+" family"] = famSignature(
                        model, famdata, bpm_positions, dev_fam, axis_kick)
                if write_json:
                    writeJson(codData, axis_kick, dev_fam[:1])
    if not write_json:
        return codData

if __name__ == '__main__':
    calc_sign()
