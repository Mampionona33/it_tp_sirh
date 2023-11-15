import axios from 'axios'
const REACT_APP_API_DEV_BASE_URL = process.env.REACT_APP_API_DEV_BASE_URL || 'http://localhost:8000'

class CotisationService {
  async getCnaps() {
    try {
      const resp = await axios.get(`${REACT_APP_API_DEV_BASE_URL}/cnaps`)
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newCotisationService = new CotisationService()

export default newCotisationService
