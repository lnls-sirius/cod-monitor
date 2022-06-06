import { Dictionary } from '@reduxjs/toolkit';
import { useDispatch} from 'react-redux';
import { setEnd, setStart, setRef, setTimeMode } from "../features/timeStore";

export const TimeAxisID = "x-axis-0";
export const TimeAxisIndex = 0;

const timeUnits = {
    "Second": 1000,
    "Minute": 60,
    "Hour": 60,
    "Day": 24,
    "Week": 7,
    "Month": 30,
    "Year": 12
}

export const intervalDict: any = {
    'Start Time': {
      0: false,
      1: true,
      2: true
    },
    'End Time': {
      0: true,
      1: false,
      2: true
    }
}

export const intervals: Dictionary<Array<number|string>> = {
    "30s": [30, "Second"],
    "1m": [1, "Minute"],
    "5m": [5, "Minute"],
    "1h": [1, "Hour"],
    "2h": [2, "Hour"],
    "4h": [4, "Hour"],
    "8h": [8, "Hour"],
    "12h": [12, "Hour"],
    "18h": [18, "Hour"],
    "1d": [1, "Day"],
    "2.5d": [2.5, "Day"],
    "1w": [1, "Week"],
    "2w": [2, "Week"],
    "1M": [1, "Month"],
    "3M": [3, "Month"],
    "6M": [6, "Month"],
    "9M": [9, "Month"],
    "1Y": [1, "Year"]
}

export function getTimeMilliseconds(unit: string): number{
    switch(unit){
        case "Second":{
            return timeUnits['Second'];
        }
        case "Minute": {
            return timeUnits['Minute'] * getTimeMilliseconds("Second");
        }
        case "Hour": {
            return timeUnits['Hour'] * getTimeMilliseconds("Minute");
        }
        case "Day": {
            return timeUnits['Day'] * getTimeMilliseconds("Hour");
        }
        case "Week": {
            return timeUnits['Week'] * getTimeMilliseconds("Day");
        }
        case "Month": {
            return timeUnits['Month'] * getTimeMilliseconds("Day");
        }
        case "Year": {
            return timeUnits['Year'] * getTimeMilliseconds("Month");
        }
    }
    return 0;
}

export function getIntervalTime(time: number, dateRef: Date): Date{
    return new Date(dateRef.getTime() + time);
}

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

    SetRefDate(date: Date){
        this.dispatch(setRef(date.toString()));
    }

    SetTimeMode(timeMode: number){
        this.dispatch(setTimeMode(timeMode));
    }
}
