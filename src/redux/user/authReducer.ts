import { createSlice } from '@reduxjs/toolkit'
import { loggedUser } from './authActions'

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setUserLoggedOut: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.isAuthenticated = true
      })
      .addCase(loggedUser.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(loggedUser.rejected, (state) => {
        state.loading = 'failed'
      })
  },
})

export const { setUserLoggedIn, setUserLoggedOut } = authSlice.actions
export default authSlice.reducer
