import { configureStore } from '@reduxjs/toolkit'
import timeReducer from '../features/timeStore'
import bpmReducer from '../features/bpmStore'

const store = configureStore({
  reducer: {
    time: timeReducer,
    bpm: bpmReducer
  }
})

export default store;
