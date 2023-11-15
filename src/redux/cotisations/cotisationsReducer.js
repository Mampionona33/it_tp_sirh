import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'

const initialState = {
  cotisation: [],
  loading: 'idle',
}

const cotisationSlice = createSlice({
  name: 'cotisations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCotisations.fulfilled, (state, action) => {
      state.cotisation = action.payload
      state.loadin = 'succeeded'
    })
  },
})

export default cotisationSlice.reducer
