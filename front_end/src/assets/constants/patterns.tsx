// File that contains the infomation for the modals and groups
import control from "../../controllers/Modals";
import { BaseStrArrayDict, DictString, ModalInterface } from "../interfaces/patterns"
import AddBPM from "../../components/BPM/AddBPM";
import Info from "../../components/Structure/Info";
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
    "Info_BPM": {
        title: "BPM Drift Page Information",
        component: <Info type="BPM"/>,
        icon: 'info',
        close: ()=>null
    },
    "Info_Orbit": {
        title: "Orbit Drift Page Information",
        component: <Info type="Orbit"/>,
        icon: 'info',
        close: ()=>null
    },
    "Al_Add_BPM": {
        title: "BPM Modification",
        component: <Message/>,
        icon: 'list',
        close: ()=>null
    },
    "Al_Add_Sign": {
        title: "Signature Addition",
        component: <Message/>,
        icon: 'plus',
        close: ()=>null
    },
    "Al_Rem_BPM": {
        title: "Signature Removal",
        component: <Message/>,
        icon: 'trash',
        close: ()=>null
    },
    "Al_Rem_Sign": {
        title: "Signature Removal",
        component: <Message/>,
        icon: 'trash',
        close: ()=>null
    },
    "Vis_BPM": {
        title: "BPM Visibility",
        component: <Message/>,
        icon: 'clock',
        close: ()=>null
    },
    "Vis_Sign": {
        title: "Signature Visibility",
        component: <Message/>,
        icon: 'clock',
        close: ()=>null
    },
    "Ch_Date": {
        title: "Changing Date",
        component: <Message/>,
        icon: 'clock',
        close: ()=>null
    },
    "Err_Server": {
        title: "Server Error",
        component: <Message/>,
        icon: 'error',
        close: ()=>null
    }
}

const bpmGroups: BaseStrArrayDict = {
    bpmNumber: [
        '01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20'
    ],
    sGroups: [
        'SB', 'SA', 'SP'
    ],
    s1: [
        '', '', '', '', '',
        '', '', '', '', '10SB',
        '', '', '', '', '',
        '', '', '', '', ''
    ],
    s2: [
        '', '', '', '', '',
        '', '', '', '', '10SB',
        '', '', '', '', '',
        '', '', '', '', ''
    ],
    bpmName: [
        'SA/SB/SP-1', 'M1', 'M2', 'C1-1', 'C1-2',
        'C2', 'C3-1', 'C3-2', 'C4', 'SA/SB/SP-2'
    ],
    axis: [
        'X', 'Y', 'X & Y'
    ]
}

const magnet_types: Array<string> = [
    'C', 'D', 'Q', 'S'
]

const magnet_names: DictString = {
    'C': "Corrector",
    'D': "Dipole",
    'Q': "Quadrupole",
    'S': "Sextupole"
}

export {
    modalInfo,
    bpmGroups,
    magnet_types,
    magnet_names
}
