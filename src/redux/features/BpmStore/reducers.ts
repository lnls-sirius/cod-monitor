import { PayloadAction } from "@reduxjs/toolkit";
import { bpmStore } from "./initialState";

function setSelected(state: bpmStore, action: PayloadAction<string>): void {
    state.list = action.payload;
}

function setColors(state: bpmStore, action: PayloadAction<string>): void {
    state.colors = action.payload;
}

function setSetters(state: bpmStore, action: PayloadAction<string>): void {
    state.leds = action.payload;
}

function setChange(state: bpmStore, action: PayloadAction<boolean>): void{
    state.change_bpm = action.payload;
}

export default {
    setSelected,
    setColors,
    setSetters,
    setChange
}
