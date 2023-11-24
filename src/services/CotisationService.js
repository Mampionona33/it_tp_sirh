import axios from 'axios'

class CotisationService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'

  async getAll() {
    try {
      const resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/cotisations/all`)
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newCotisationService = new CotisationService()

export default newCotisationService
