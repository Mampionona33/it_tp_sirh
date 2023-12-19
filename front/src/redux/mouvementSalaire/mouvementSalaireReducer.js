import { createSlice } from '@reduxjs/toolkit'
import { fetchAllMouvementSalaire } from './mouvementSalaireAction'

const initialState = {
  list: [],
  loading: 'idle',
}

const mouvementSalaireSlice = createSlice({
  name: 'mouvementSalaire',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMouvementSalaire.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = 'succeeded'
    })
  },
})

export default mouvementSalaireSlice.reducer
