import { createSlice } from '@reduxjs/toolkit'
import { fetchAllUsers } from './employeesAction'

const initialState = {
  list: [],
  loading: 'idle', // Vous pouvez initialiser loading avec la valeur appropriée
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = 'succeeded'
    })
  },
})

export default employeesSlice.reducer
