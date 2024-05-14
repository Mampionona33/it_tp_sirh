import axios from 'axios'

class EmployeurService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.resp = null
  }

  async fetchEmployeur() {
    try {
      // const email = store.getState().auth.user.email
      // const password = store.getState().auth.user.password
      const email = 'lslisteemployes'
      const password = '20lsliste23'

      this.resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/employeurs`, {
        auth: {
          username: email,
          password: password,
        },
      })

      return this.resp
    } catch (error) {
      throw error
    }
  }
}

const EmployeurServiceInstance = new EmployeurService()

export default EmployeurServiceInstance
