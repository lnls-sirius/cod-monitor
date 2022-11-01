// File that contain the static text present in the interface

import { DictString } from "../interfaces/patterns"

export const version: string = '2022-08-23-73kw9a1'

export const footer: DictString = {
    text: "For further information, contact FAC.",
    verInfo: version
}

export const pages: DictString = {
    '/bpmDrift': 'BPM Drift',
    '/orbitDrift': 'Orbit Drift'
}

export const markers: Array<string> = [
    'Marker-1',
    'Marker-2'
]

export const filter_txt: string = "Filter:"
