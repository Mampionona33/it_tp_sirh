import axios from 'axios'

class MouvementSalaireService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  async getAll() {
    try {
      const resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/mouvement-salaire`)
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newMouvementSalaireService = new MouvementSalaireService()

export default newMouvementSalaireService