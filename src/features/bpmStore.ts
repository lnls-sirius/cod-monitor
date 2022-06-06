import { createSlice } from '@reduxjs/toolkit'

export const bpmData = createSlice({
  name: 'bpm',
  initialState: {
    bpm_list: '{}'
  },
  reducers: {
    setSelectBpm: (state, action) => {
      state.bpm_list = action.payload;
    }
  }
})

export const { setSelectBpm } = bpmData.actions

export default bpmData.reducer
