import { createSlice } from '@reduxjs/toolkit'
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from './employeesAction'
import { BaseReduxState } from '@src/interfaces/interfaceDeBaseReduxState'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { AxiosError } from 'axios'

export interface IEmployeeList extends BaseReduxState {
  list: IEmploye[]
}

const initialState: IEmployeeList = {
  list: [],
  loading: 'idle',
  error: null,
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    resetListEmployees: (state) => initialState,
    setListEmployees: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        if (action.payload && typeof action.payload === 'object') {
          const newEmployees = Object.values(action.payload)

          if (newEmployees.length > 0) {
            if (state.list) {
              state.list = state.list ? [...newEmployees] : newEmployees
              state.loading = 'succeeded'
            }
          } else {
            state.loading = 'loading'
          }
        } else {
          state.error = null
        }
      })
      .addCase(fetchAllEmployees.pending, (state, action) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error as AxiosError
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => String(employee.id) !== String(action.payload))
        state.loading = 'succeeded'
        state.error = null
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error as AxiosError
      })
      .addCase(deleteEmployee.pending, (state, action) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        const newEmployee = action.payload.data ? action.payload.data : action.payload
        if (newEmployee) {
          state.list = [...state.list, newEmployee]
          state.loading = 'succeeded'
          state.error = null
        }
      })

      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error as AxiosError
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.list = []
        state.error = null
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.error as AxiosError
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.error = null
      })
  },
})

export const { resetListEmployees, setListEmployees } = employeesSlice.actions

export default employeesSlice.reducer
