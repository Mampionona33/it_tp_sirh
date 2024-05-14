import { createAsyncThunk } from '@reduxjs/toolkit'
import categorieEmployeService from '@src/services/CategorieEmployeService'

export const fetchCategorieEmployes = createAsyncThunk('categorieEmploye/fetchAll', async () => {
  const res = await categorieEmployeService.getAll()
  return res
})
