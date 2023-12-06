import { createAsyncThunk } from '@reduxjs/toolkit'
import EmployeurServiceInstance from '../../services/EmployeurService'

export const fetcheEmpoyeur = createAsyncThunk('employeur/fetcheEmpoyeur', async (thunkAPI) => {
  const res = await EmployeurServiceInstance.fetcheEmpoyeur()
  return res.data
})
