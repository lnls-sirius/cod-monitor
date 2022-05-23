import { useDispatch} from 'react-redux';
import { setEnd, setStart, setRef } from "../features/timeStore";

export const TimeAxisID = "x-axis-0";

export const TimeAxisIndex = 0;

export function outOfRange(start: Date, end: Date, ref?: Date){
    const now = new Date();
    if(start.getTime() > end.getTime() ||
        end.getTime() < start.getTime() ||
        start.getTime() > now.getTime() ||
        end.getTime() > now.getTime()){
        return false;
    }else if(ref != undefined &&
                (ref.getTime() < start.getTime() || ref.getTime() > end.getTime())){
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

    SetRefDate(date: Date){
        this.dispatch(setRef(date.toString()));
    }
}
