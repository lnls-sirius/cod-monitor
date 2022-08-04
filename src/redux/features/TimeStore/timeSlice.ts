import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import reducers from "./reducers";

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers
})

export const { actions, reducer } = timeSlice;
