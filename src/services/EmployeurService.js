import axios from 'axios'

class EmployeurService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.resp = null
  }

  async fetchEmployeur() {
    try {
      this.resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/employeur`)
      console.log(this.resp)
      return this.resp.data // Correction : Retourner la propriété 'data' de la réponse
    } catch (error) {
      console.error(error) // Correction : Utilisation de console.error pour indiquer une erreur
      throw error // Correction : Lancer à nouveau l'erreur pour la gestion ultérieure
    }
  }
}
