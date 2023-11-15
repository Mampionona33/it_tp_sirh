import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'

const initialState = {
  liste: [],
  loading: 'idle',
}

const cotisationSlice = createSlice({
  name: 'cotisations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCotisations.fulfilled, (state, action) => {
      state.liste = action.payload
      state.loadin = 'succeeded'
    })
  },
})

export default cotisationSlice.reducer
