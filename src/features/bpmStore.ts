import { createSlice } from '@reduxjs/toolkit'

export const bpmData = createSlice({
  name: 'bpm',
  initialState: {
    bpm_list: '{}',
    colors: '{}'
  },
  reducers: {
    setSelectBpm: (state, action) => {
      state.bpm_list = action.payload;
    },
    setColorsBpm: (state, action) => {
      state.colors = action.payload;
    }
  }
})

export const { setSelectBpm, setColorsBpm } = bpmData.actions

export default bpmData.reducer
