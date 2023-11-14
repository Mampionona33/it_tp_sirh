import axios from 'axios'

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'

console.log(process.env.REACT_APP_API_BASE_URL)

class EmployeeService {
  login = 'lslisteemployes'
  pass = '20lsliste23'

  async getAll() {
    try {
      const response = await axios.get(`${REACT_APP_API_BASE_URL}/listeemployes`, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
    }
  }
  getById(id) {
    return axios.get(`${REACT_APP_API_BASE_URL}/employees/id=${id}`)
  }
}

export default new EmployeeService()
