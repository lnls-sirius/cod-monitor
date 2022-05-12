import { createSlice } from '@reduxjs/toolkit'

export const timeData = createSlice({
  name: 'time',
  initialState: {
    start_date: (new Date()).toString(),
    end_date: (new Date()).toString()
  },
  reducers: {
    setStart: (state, action) => {
      state.start_date = action.payload;
    },
    setEnd: (state, action) => {
      state.end_date = action.payload;
    }
  }
})

export const { setStart, setEnd } = timeData.actions

export default timeData.reducer
