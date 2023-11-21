import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setUserLoggedOut: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { setUserLoggedIn, setUserLoggedOut } = authSlice.actions
export default authSlice.reducer
