import { configureStore } from '@reduxjs/toolkit'
import {reducer as timeReducer} from '../features/TimeStore'
import {reducer as bpmReducer} from '../features/BpmStore'
import {reducer as orbitReducer} from '../features/OrbitStore'
import { timeStore } from '../features/TimeStore/initialState'
import { bpmStore } from '../features/BpmStore/initialState'
import { orbitStore } from '../features/OrbitStore/initialState'

export interface StoreInterface {
  time: timeStore,
  bpm: bpmStore,
  orbit: orbitStore
}

const store = configureStore({
  reducer: {
    time: timeReducer,
    bpm: bpmReducer,
    orbit: orbitReducer
  }
})

export default store;
