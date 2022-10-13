import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'
import reducers from './reducers'

const bpmSlice = createSlice({
    name: 'bpm',
    initialState,
    reducers
})

export const { actions, reducer } = bpmSlice;
