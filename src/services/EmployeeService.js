import axios from 'axios'

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
console.log(process.env.GITPOD_WORKSPACE_URL)

class EmployeeService {
  getAll() {
    return axios.get(`${REACT_APP_API_BASE_URL}/employees/list`)
  }
  getById(id) {
    return axios.get(`${REACT_APP_API_BASE_URL}/employees/id=${id}`)
  }
}

export default new EmployeeService()
