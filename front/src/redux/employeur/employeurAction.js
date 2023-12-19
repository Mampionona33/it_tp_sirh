import { createAsyncThunk } from '@reduxjs/toolkit'
import EmployeurServiceInstance from '../../services/EmployeurService'

export const fetcheEmpoyeur = createAsyncThunk('employeur/fetcheEmpoyeur', async (thunkAPI) => {
  try {
    const res = await EmployeurServiceInstance.fetchEmployeur()
    // console.log(res.data)
    return res.data
  } catch (error) {
    // console.error('Error fetching employeur:', error)
    throw error
  }
})
