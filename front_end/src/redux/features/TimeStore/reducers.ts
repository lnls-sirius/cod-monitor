import { PayloadAction } from "@reduxjs/toolkit";
import { pastDate, getNewTimeInterval, validInterval } from "../../../controllers/time";
import { timeStore } from "./initialState";

function setStart (state: timeStore, action: PayloadAction<string>): void {
    if(state.time_mode !== 'None'){
        const interval = getNewTimeInterval(
            state.interval_mil, new Date(action.payload), state.time_mode);
        if(pastDate(new Date(action.payload), interval)){
            state.start_date = action.payload;
            state.end_date = interval.toString();
        }
    }else{
        const endDate = new Date(state.end_date)
        if(pastDate(new Date(action.payload), endDate) &&
            validInterval(new Date(action.payload), endDate)){
                state.start_date = action.payload;
        }
    }
}

function setEnd (state: timeStore, action: PayloadAction<string>): void {
    if(state.time_mode !== 'None'){
        const interval = getNewTimeInterval(
            state.interval_mil, new Date(action.payload), state.time_mode);
        if(pastDate(interval, new Date(action.payload))){
            state.end_date = action.payload;
            state.start_date = interval.toString();
        }
    }else{
        const startDate = new Date(state.start_date)
        if(pastDate(startDate, new Date(action.payload)) &&
            validInterval(startDate, new Date(action.payload))){
                state.end_date = action.payload;
        }
    }
}

function setRef (state: timeStore, action: PayloadAction<string>): void {
    state.ref_date = action.payload;
}

function setTimeMode (state: timeStore, action: PayloadAction<string>): void {
    state.time_mode = action.payload;
}

function setIntervalMilliseconds (state: timeStore, action: PayloadAction<number>): void {
    state.interval_mil = action.payload;
}

function setChangeTime (state: timeStore, action: PayloadAction<boolean>): void {
    state.change_time = action.payload;
}

export default {
    setStart,
    setEnd,
    setRef,
    setTimeMode,
    setIntervalMilliseconds,
    setChangeTime
}
