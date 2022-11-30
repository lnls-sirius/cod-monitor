// File that contains the infomation for the modals and groups
import control from "../../controllers/Modals";
import { BaseStrArrayDict, ModalInterface } from "../interfaces/patterns"
import AddBPM from "../../components/BPM/AddBPM";
import Message from "../../components/Patterns/Message";
import { BpmDispatcher } from "../../redux/dispatcher";

function addBPMAlert(){
    control.setAlert('Al_Add_BPM');
    BpmDispatcher.setChangeBpm(true);
}

const modalInfo: {[key: string]: ModalInterface} = {
    "BPM": {
        title: "Add BPM",
        component: <AddBPM/>,
        icon: 'list',
        close: addBPMAlert
    },
    "Al_Add_BPM": {
        title: "BPM Modification",
        component: <Message/>,
        icon: 'list'
    },
    "Al_Add_Sign": {
        title: "Signature Addition",
        component: <Message/>,
        icon: 'plus'
    },
    "Al_Rem_BPM": {
        title: "Signature Removal",
        component: <Message/>,
        icon: 'trash'
    },
    "Al_Rem_Sign": {
        title: "Signature Removal",
        component: <Message/>,
        icon: 'trash'
    },
    "Vis_BPM": {
        title: "BPM Visibility",
        component: <Message/>,
        icon: 'clock'
    },
    "Vis_Sign": {
        title: "Signature Visibility",
        component: <Message/>,
        icon: 'clock'
    },
    "Ch_Date": {
        title: "Changing Date",
        component: <Message/>,
        icon: 'clock'
    },
    "Err_Server": {
        title: "Server Error",
        component: <Message/>,
        icon: 'error'
    }
}

const bpmGroups: BaseStrArrayDict = {
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

const magnet_types: Array<string> = [
    'C', 'D', 'Q', 'S'
]

export {
    modalInfo,
    bpmGroups,
    magnet_types
}
