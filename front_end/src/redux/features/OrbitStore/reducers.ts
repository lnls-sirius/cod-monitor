import { PayloadAction } from "@reduxjs/toolkit";
import { orbitStore } from "./initialState";

function setChange(state: orbitStore, action: PayloadAction<boolean>): void{
    state.change_orbit = action.payload;
}

function setSignatureList (state: orbitStore, action: PayloadAction<string>): void {
    state.signatures = action.payload;
}

export default {
    setSignatureList,
    setChange
}
