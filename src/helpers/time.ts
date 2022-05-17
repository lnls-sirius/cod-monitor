import { useDispatch} from 'react-redux';
import { setEnd, setStart } from "../features/timeStore";

export const TimeAxisID = "x-axis-0";

export function outOfRange(start: Date, end: Date){
    const now = new Date();
    if(start.getTime() > end.getTime() ||
        end.getTime() < start.getTime() ||
        start.getTime() > now.getTime() ||
        end.getTime() > now.getTime()){
        return false;
    }else{
        return true;
    }
}

export class TimeDispatcher{
    private dispatch = useDispatch();

    SetStartDate(date: Date){
        this.dispatch(setStart(date.toString()));
    }

    SetEndDate(date: Date){
        this.dispatch(setEnd(date.toString()));
    }
}
