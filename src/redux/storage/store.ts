import { configureStore } from '@reduxjs/toolkit'
import {reducer as timeReducer} from '../features/TimeStore'
import {reducer as bpmReducer} from '../features/BpmStore'
import { timeStore } from '../features/TimeStore/initialState'
import { bpmStore } from '../features/BpmStore/initialState'

export interface storeInterface {
  time: timeStore,
  bpm: bpmStore
}

const store = configureStore({
  reducer: {
    time: timeReducer,
    bpm: bpmReducer
  }
})

export default store;
