import { createSlice } from '@reduxjs/toolkit'
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from './employeesAction'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

const initialState = {
  list: [],
  loading: 'idle',
  loadingUpdate: 'idle',
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
            state.list = state.list ? [...newEmployees] : newEmployees
            state.loading = 'succeeded'
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
        state.loading = 'reject'
        state.error = action.error
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => employee.id !== action.payload)
        state.loading = 'succeeded'
        state.error = null
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = 'reject'
        state.error = action.error
      })
      .addCase(deleteEmployee.pending, (state, action) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload]
        state.loading = 'succeeded'
        state.error = null
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = 'reject'
        state.error = action.error
      })
      .addCase(createEmployee.pending, (state, action) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.list = []
        state.loadingUpdate = 'succeeded'
        state.error = null
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loadingUpdate = 'reject'
        state.error = action.error
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.loadingUpdate = 'loading'
        state.error = null
      })
  },
})

export const { resetListEmployees, setListEmployees } = employeesSlice.actions

export default employeesSlice.reducer
