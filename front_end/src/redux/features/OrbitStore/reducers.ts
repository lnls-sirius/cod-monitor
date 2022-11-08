import { PayloadAction } from "@reduxjs/toolkit";
import { orbitStore } from "./initialState";

function setChange(state: orbitStore, action: PayloadAction<boolean>): void{
    state.change_orbit = action.payload;
}

function setSignatureListInterface (state: orbitStore, action: PayloadAction<string>): void {
    state.signatures = action.payload;
}

export default {
    setSignatureListInterface,
    setChange
}
