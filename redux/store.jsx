import { createStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from './slices/auth'

const rootReducer = combineReducers({
    auth: AuthReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)