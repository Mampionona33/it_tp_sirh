import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebar/sidebarReducer'
import employeHoursReducer from './employeHours/employeHoursReducer'
import selectedEmployeReducer from './selectedEmploye/selectedEmployeReducer'
import bulletinDePaieReducer from './bulletinDePaie/bulletinDePaieReducer'
import employeesReducer from './employees/employeesReducer'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['employeesList'],
}

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  employeHours: employeHoursReducer,
  selectedEmploye: selectedEmployeReducer,
  bulletinDePaie: bulletinDePaieReducer,
  employeesList: employeesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive la vérification de sérialisation obsolète
    }),
})

export const store = configStore
export const persistor = persistStore(configStore)
