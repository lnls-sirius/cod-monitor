import { configureStore } from '@reduxjs/toolkit'
import timeReducer from '../features/timeStore'
import bpmReducer from '../features/bpmStore'
import chartReducer from '../features/chartStore'

const store = configureStore({
  reducer: {
    time: timeReducer,
    bpm: bpmReducer,
    chart: chartReducer
  }
})

export default store;
