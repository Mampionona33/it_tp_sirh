import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebar/sidebarReducer'
import employeHoursReducer from './employeHours/employeHoursReducer'
import selectedEmployeReducer from './selectedEmploye/selectedEmployeReducer'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  employeHours: employeHoursReducer,
  selectedEmploye: selectedEmployeReducer,
})

const configStore = configureStore({
  reducer: rootReducer,
})

const store = configStore

export default store
