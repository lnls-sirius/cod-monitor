import { createSlice } from '@reduxjs/toolkit'

export const bpmData = createSlice({
  name: 'bpm',
  initialState: {
    listBpm: {}
  },
  reducers: {
    setSelectBpm: (state, action) => {
      state.listBpm = action.payload;
    }
  }
})

export const { setSelectBpm } = bpmData.actions

export default bpmData.reducer
