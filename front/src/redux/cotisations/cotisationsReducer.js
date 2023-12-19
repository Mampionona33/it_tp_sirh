import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'

const initialState = {
  liste: [],
  loading: 'idle',
}

const cotisationSlice = createSlice({
  name: 'cotisations',
  initialState,
  reducers: {
    resetCotisation: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCotisations.fulfilled, (state, action) => {
      state.liste = action.payload
      state.loadin = 'succeeded'
    })
  },
})

export const { resetCotisation } = cotisationSlice.actions

export default cotisationSlice.reducer
