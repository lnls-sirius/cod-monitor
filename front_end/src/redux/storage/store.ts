import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

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

const persistConfig = {
  key: 'root',
  storage
}

const persistedTimeReducer = persistReducer(persistConfig, timeReducer)
const persistedBpmReducer = persistReducer(persistConfig, bpmReducer)
const persistedOrbitReducer = persistReducer(persistConfig, orbitReducer)

export const store = configureStore({
  reducer: {
    time: persistedTimeReducer,
    bpm: persistedBpmReducer,
    orbit: persistedOrbitReducer  
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
