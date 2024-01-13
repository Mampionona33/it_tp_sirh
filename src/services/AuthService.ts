import { ILoginProps } from '@src/redux/user/logginInterface'
import axios from 'axios'

class AuthService {
  private REACT_APP_API_BASE_URL: string
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  }

  async login(params: ILoginProps) {
    const { email, password } = params

    try {
      const resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/login`, {
        email: email,
        password: password,
      })
      return resp
    } catch (error) {
      throw error
    }
  }
}

export default AuthService
