import { createSlice } from '@reduxjs/toolkit'
import { fetchAllEmployees } from './employeesAction'

const initialState = {
  list: [],
  loading: 'idle',
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
        state.list = action.payload
        state.loading = 'succeeded'
      })
      .addCase(fetchAllEmployees.pending, (state, action) => {
        state.loading = 'loading'
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = 'reject'
      })
  },
})

export const { resetListEmployees, setListEmployees } = employeesSlice.actions

export default employeesSlice.reducer
