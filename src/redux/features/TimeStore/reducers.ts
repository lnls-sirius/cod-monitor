import { PayloadAction } from "@reduxjs/toolkit";
import { outOfRange, updateTimeRef } from "../../../controllers/Time/functions";
import { timeStore } from "./initialState";

function setStart (state: timeStore, action: PayloadAction<string>): void {
    const interval = updateTimeRef(
        state.interval_mil, new Date(action.payload), state.time_mode);
    if(outOfRange(new Date(action.payload), interval, state.time_mode)){
        state.start_date = action.payload;
        state.end_date = interval.toString();
    }
}

function setEnd (state: timeStore, action: PayloadAction<string>): void {
    const interval = updateTimeRef(
        state.interval_mil, new Date(action.payload), state.time_mode);
    if(outOfRange(interval, new Date(action.payload), state.time_mode)){
        state.end_date = action.payload;
        state.start_date = interval.toString();
    }
}

function setRef (state: timeStore, action: PayloadAction<string>): void {
    state.ref_date = action.payload;
}

function setTimeMode (state: timeStore, action: PayloadAction<number>): void {
    state.time_mode = action.payload;
}

function setIntervalMilliseconds (state: timeStore, action: PayloadAction<number>): void {
    state.interval_mil = action.payload;
}

function setChangeTime (state: timeStore, action: PayloadAction<boolean>): void {
    state.change_time = action.payload;
}

function setIntervalList (state: timeStore, action: PayloadAction<string>): void {
    state.date_list = action.payload;
}

export default {
    setStart,
    setEnd,
    setRef,
    setTimeMode,
    setIntervalMilliseconds,
    setChangeTime,
    setIntervalList
}
