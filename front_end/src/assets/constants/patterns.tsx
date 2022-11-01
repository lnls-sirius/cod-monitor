// File that contains the infomation for the modals and groups
import { BaseStrArrayDict, ModalInfo } from "../interfaces/patterns"
import { BpmDispatcher } from "../../redux/dispatcher";
import AddBPM from "../../components/BPM/AddBPM";

export const modalInfo: ModalInfo = {
    "BPM": {
        title: "Add BPM",
        component: <AddBPM/>,
        icon: 'list',
        close: ()=>BpmDispatcher.setChangeBpm(true)
    }
}

export const bpmGroups: BaseStrArrayDict = {
    bpmNumber: [
        '01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20'
    ],
    bpmName: [
        'M1', 'M2', 'C1-1', 'C1-2',
        'C2', 'C3-1', 'C3-2', 'C4'
    ],
    axis: [
        'X', 'Y', 'Couple'
    ]
}

export const magnet_types: Array<string> = [
    'C', 'D', 'Q', 'S'
]
