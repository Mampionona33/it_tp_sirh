import axios from 'axios'
import { store } from 'src/redux/store'

class EmployeurService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.resp = null
    this.email = store.getState().auth.user.email
    this.password = store.getState().auth.user.password
  }

  async fetchEmployeur() {
    try {
      this.resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/employeurs`, {
        auth: {
          username: this.email,
          password: this.password,
        },
      })
      // console.log(this.resp)
      return this.resp
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
}

const EmployeurServiceInstance = new EmployeurService()

export default EmployeurServiceInstance
