import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebar/sidebarReducer'
import employeHoursReducer from './employeHours/employeHoursReducer'
import selectedEmployeReducer from './selectedEmploye/selectedEmployeReducer'
import bulletinDePaieReducer from './bulletinDePaie/bulletinDePaieReducer'
import employeesReducer from './employees/employeesReducer'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  employeHours: employeHoursReducer,
  selectedEmploye: selectedEmployeReducer,
  bulletinDePaie: bulletinDePaieReducer,
  employeesList: employeesReducer,
})

const configStore = configureStore({
  reducer: rootReducer,
})

const store = configStore

export default store
