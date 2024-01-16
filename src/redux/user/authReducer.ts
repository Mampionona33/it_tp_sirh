import { createSlice } from '@reduxjs/toolkit'
import { loggedUser } from './authActions'

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: 'idle',
  error: null,
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
        if (action.payload.data === 'Connecté') {
          state.loading = 'succeeded'
          state.isAuthenticated = true
        }
        state.error = null
      })
      .addCase(loggedUser.pending, (state) => {
        state.isAuthenticated = false
        state.loading = 'pending'
      })
      .addCase(loggedUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.isAuthenticated = false
        state.error = action.error
      })
  },
})

export const { setUserLoggedIn, setUserLoggedOut } = authSlice.actions
export default authSlice.reducer
