import { PayloadAction } from "@reduxjs/toolkit";
import { outOfRange } from "../../../controllers/Time/interval";
import { timeStore } from "./initialState";

function setStart (state: timeStore, action: PayloadAction<string>): void {
    if(outOfRange(new Date(action.payload), new Date(state.end_date), state.time_mode)){
        state.start_date = action.payload;
    }
}

function setEnd (state: timeStore, action: PayloadAction<string>): void {
    if(outOfRange(new Date(state.start_date), new Date(action.payload), state.time_mode)){
        state.end_date = action.payload;
    }
}

function setRef (state: timeStore, action: PayloadAction<string>): void {
    state.ref_date = action.payload;
}

function setTimeMode (state: timeStore, action: PayloadAction<number>): void {
    state.time_mode = action.payload;
}

export default {
    setStart,
    setEnd,
    setRef,
    setTimeMode
}