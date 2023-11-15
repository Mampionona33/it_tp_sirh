import { createAsyncThunk } from '@reduxjs/toolkit'
import EmployeeService from 'src/services/EmployeeService'

export const fetchAllEmployees = createAsyncThunk('employees/fetchAll', async (thunkAPI) => {
  const res = EmployeeService.getAll()
  return res
})
