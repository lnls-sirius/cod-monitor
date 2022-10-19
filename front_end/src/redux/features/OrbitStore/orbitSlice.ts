import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const orbitSlice = createSlice({
    name: 'orbit',
    initialState,
    reducers
})

export const { actions, reducer } = orbitSlice;
