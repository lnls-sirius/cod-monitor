import { createSlice } from '@reduxjs/toolkit'

export const chartData = createSlice({
  name: 'chart',
  initialState: {
    pending: false
  },
  reducers: {
    togglePending: (state) => {
      state.pending = !state.pending;
    }
  }
})

export const { togglePending } = chartData.actions

export default chartData.reducer
