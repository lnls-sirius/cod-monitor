import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEnd, setStart } from "../features/timeStore";

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

const startDate: React.FC = () => {
    const start = useSelector((state: any) => state.time.start_date);
    return start;
} 

export class TimeDispatcher{
    private dispatch = useDispatch();

    SetStartDate(date: Date){
        if(outOfRange(date, startDate())){
        }console.log(startDate());
        this.dispatch(setStart(date.toString()));
    }

    SetEndDate(date: Date){
        // if(outOfRange(this.startDate, date)){
        //     this.dispatch(setEnd(date.toString()));
        // }
    }

    GetStartDate(){
        return new Date(startDate());
    }

    GetEndDate(){
        return new Date();
    }
}
