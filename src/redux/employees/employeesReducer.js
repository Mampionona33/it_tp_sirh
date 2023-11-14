import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUsers } from './employeesAction'

const initialState = []

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return [...state, ...action.payload]
    })
  },
})

export default employeesSlice.reducer
