// File that contain the static text present in the interface

import { DictString } from "../interfaces/patterns"

const version: string = '2022-11-29-73kw9a1'

const pages: DictString = {
    '/bpmDrift': 'BPM Drift',
    '/orbitDrift': 'Orbit Drift'
}

const alert_messages: DictString = {
    "Al_Add_BPM": "The selected BPMs were added",
    "Al_Add_Sign": "The selected signature was added",
    "Al_Rem_BPM": "The selected BPM was removed",
    "Al_Rem_Sign": "The selected Signature was removed",
    "Vis_BPM": "The selected BPM changed its visibility",
    "Vis_Sign": "The selected Signature changed its visibility",
    "Ch_Date": "The Date was changed",
    "Err_Server": "The server has encountered an error"
}

export {
    version,
    pages,
    alert_messages
}
