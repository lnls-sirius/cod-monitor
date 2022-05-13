import AddBPM from "../components/AddBPM"
import TimeInput from "../components/TimeInput";

const addBPM = () => <AddBPM />;
const startTime = () => <TimeInput action={'Start Time'}/>
const endTime = () => <TimeInput action={'End Time'}/>

export const sideMenu = {
    'BPMs': {
        general: {
            'Add BPM': addBPM() //Insert in this place - Key / Modal Size
        }
    },
    'Time': {
        general: {
            'Start Time': startTime(),
            'End Time': endTime(),
            'Intervals': 1234
        }
    },
    'Graph': {
        general: {
            'Icons': 4
        }
    }
}

export const bpmGroups = {
    bpmNumber: [
        '01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20'
    ],
    bpmName: [
        'M1', 'M2', 'C1-1', 'C1-2',
        'C2', 'C3-1', 'C3-2', 'C4'
    ]
}
