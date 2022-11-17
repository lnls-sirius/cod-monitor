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

export const filter_txt: DictString = {
    main: "Filters",
    magnet: "Magnets:",
    axis: "Axis:"
}

export const alert_messages: DictString = {
    "Al_Add_BPM": "The selected BPMs were added",
    "Al_Add_Sign": "The selected signature was added",
    "Al_Rem_BPM": "The selected BPM was removed",
    "Al_Rem_Sign": "The selected Signature was removed",
    "Vis_BPM": "The selected BPM changed its visibility",
    "Vis_Sign": "The selected Signature changed its visibility",
    "Ch_Date": "The Date was changed"
}
