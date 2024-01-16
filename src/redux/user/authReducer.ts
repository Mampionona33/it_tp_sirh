import { createSlice } from '@reduxjs/toolkit'
import { loggedUser } from './authActions'
import { AxiosError } from 'axios'

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
        // console.log(action.payload.data)

        /**
         * Je dois faire cette modification car le backend envoie
         * un statut 204 avec un message d'erreur 'Vérifier les identifications'
         * pour indiquer que l'authentification est incorrecte.
         */

        if (action.payload.data === 'Vérifier les identifications') {
          state.isAuthenticated = false
          const error = new AxiosError()
          error.message = action.payload.data
          error.code = 'ERR_BAD_REQUEST'
          state.error = error
          state.loading = 'failed'
        }

        if (action.payload.data === 'Connecté') {
          state.loading = 'succeeded'
          state.isAuthenticated = true
          state.error = null
        }
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
