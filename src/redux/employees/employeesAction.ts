import { createAsyncThunk } from '@reduxjs/toolkit'
import EmployeeService, { updateEmployeeProps } from 'src/services/EmployeeService'

export const fetchAllEmployees = createAsyncThunk('employees/fetchAll', async (thunkAPI) => {
  const res = EmployeeService.getAll()
  return res
})

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (params: updateEmployeeProps, thunkAPI) => {
    const { id, data } = params
    try {
      const res = EmployeeService.delete(id, data)
      return res
    } catch (error) {
      throw error
    }
  },
)
