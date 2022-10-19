import { PayloadAction } from "@reduxjs/toolkit";
import { orbitStore } from "./initialState";

function setSignatureList (state: orbitStore, action: PayloadAction<string>): void {
    state.signatures = action.payload;
}

export default {
    setSignatureList
}
