import { createSlice } from '@reduxjs/toolkit'
import { fetchAllEmployees } from './employeesAction'

const initialState = {
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
            state.list = state.list ? [...newEmployees] : newEmployees
            state.loading = 'succeeded'
          } else {
            state.loading = 'emptyList'
          }
        } else {
          state.error = 'error'
        }
      })
      .addCase(fetchAllEmployees.pending, (state, action) => {
        state.loading = 'loading'
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = 'reject'
        state.error = action.error
      })
  },
})

export const { resetListEmployees, setListEmployees } = employeesSlice.actions

export default employeesSlice.reducer
