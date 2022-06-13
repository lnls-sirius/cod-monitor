import { createSlice } from '@reduxjs/toolkit'
import { outOfRange } from '../helpers/time';

export const timeData = createSlice({
  name: 'time',
  initialState: {
    time_mode: 0,
    start_date: (new Date()).toString(),
    end_date: (new Date()).toString(),
    ref_date: (new Date()).toString(),

  },
  reducers: {
    setStart: (state, action) => {
      if(outOfRange(new Date(action.payload), new Date(state.end_date), state.time_mode)){
        state.start_date = action.payload;
      }
    },
    setEnd: (state, action) => {
      if(outOfRange(new Date(state.start_date), new Date(action.payload), state.time_mode)){
        state.end_date = action.payload;
      }
    },
    setRef: (state, action) => {
      state.ref_date = action.payload;
    },
    setTimeMode: (state, action) => {
      state.time_mode = action.payload;
    }
  }
})


export const { setStart, setEnd, setRef, setTimeMode } = timeData.actions

export default timeData.reducer
