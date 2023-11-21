import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedin: (state,action.payload) => {
      state.user = action.payload
      isAuthenticated: true,
    },
    setUserLoggedOut: (state) => {
      isAuthenticated: false,
        user: null,
    },
  },
})

export const { setUserLoggedin, setUserLoggedOut } = userSlice.actions
export default userSlice.reducer
