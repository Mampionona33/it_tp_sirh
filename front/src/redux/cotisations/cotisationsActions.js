import { createAsyncThunk } from '@reduxjs/toolkit'
import categorieEmployeService from '@src/services/CategorieEmployeService'
import CotisationService from 'src/services/CotisationService'

export const fetchAllCotisations = createAsyncThunk('cotisations/all', async () => {
  const resp = await categorieEmployeService.getAll()
  return resp
})
