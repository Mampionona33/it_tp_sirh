import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginProps } from './logginInterface'
import AuthService from '../../services/AuthService'

const authService = new AuthService()

export const loggedUser = createAsyncThunk(
  'user/loggedUser',

  async (param: ILoginProps, thunkAPI) => {
    const { email, password } = param

    try {
      const res = await authService.login({ email, password })
      return res
    } catch (error) {
      throw error
    }
  },
)
