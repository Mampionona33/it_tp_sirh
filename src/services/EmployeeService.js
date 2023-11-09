import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

class EmployeeService {
  getAll() {
    return axios.get(`${API_BASE_URL}/employee/list`)
  }
}

export default new EmployeeService()
