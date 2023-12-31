import { createAsyncThunk } from '@reduxjs/toolkit'
import CotisationService from 'src/services/CotisationService'

export const fetchAllCotisations = createAsyncThunk('cotisations/all', async () => {
  const res = CotisationService.getAll()
  return res
})
