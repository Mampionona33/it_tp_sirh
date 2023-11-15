import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUsers } from './employeesAction'

const initialState = {
  list: [],
  loading: 'idle',
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = 'succeeded'
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = 'loading'
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = 'reject'
      })
  },
})

export default employeesSlice.reducer
