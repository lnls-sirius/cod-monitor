import { useDispatch } from "react-redux";
import {setColorsBpm, setSelectBpm} from '../features/bpmStore';

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
    ],
    axis: [
        'X', 'Y', 'Couple'
    ]
}

export class BpmDispatcher{
    private dispatch = useDispatch();

    setBpmList(list: string){
        this.dispatch(setSelectBpm(list));
    }

    setColorsList(list: string){
        this.dispatch(setColorsBpm(list));
    }
}
