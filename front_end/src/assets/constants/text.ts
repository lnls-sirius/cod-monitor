// File that contain the static text present in the interface
import GitInfo from 'react-git-info/macro';
import { DictString } from "../interfaces/patterns"

const git_version = GitInfo()
const version: string = "v"+git_version.tags + "--" + git_version.commit.date;

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
