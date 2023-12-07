import axios from 'axios'

class DnsService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.resp = null
  }

  async fetch() {
    try {
      this.resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/dns`, {
        periode: periode,
        annee: annee,
      })
      return this.resp
    } catch (error) {
      throw error
    }
  }
}

const InstaceDnsService = new DnsService()
export default InstaceDnsService
