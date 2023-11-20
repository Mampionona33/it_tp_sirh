import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggin: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedin: (state) => {
      state.loggin = true
    },
    setUserLoggedOut: (state) => {
      state.loggin = false
    },
  },
})

export const { setUserLoggedin, setUserLoggedOut } = userSlice.actions
export default userSlice.reducer
