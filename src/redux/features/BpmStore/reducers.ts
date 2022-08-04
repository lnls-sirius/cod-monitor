import { PayloadAction } from "@reduxjs/toolkit";
import { bpmStore } from "./initialState";

function setSelectBpm(state: bpmStore, action: PayloadAction<string>): void {
    state.list = action.payload;
}

function setColorsBpm(state: bpmStore, action: PayloadAction<string>): void {
    state.colors = action.payload;
}

export default {
    setSelectBpm,
    setColorsBpm
}
