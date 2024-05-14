import { createAsyncThunk } from '@reduxjs/toolkit'
import MouvementSalaire from 'src/services/MouvementSalaireService'

export const fetchAllMouvementSalaire = createAsyncThunk(
  'mouvements/fetchAll',
  async (thunkAPI) => {
    const res = MouvementSalaire.getAll()
    return res
  },
)
