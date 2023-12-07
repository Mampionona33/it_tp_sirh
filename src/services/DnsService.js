import axios from 'axios'

class DnsService {
  static REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'

  constructor() {
    this.resp = null
  }

  async fetch(periode, annee) {
    try {
      this.resp = await axios.get(`${DnsService.REACT_APP_API_BASE_URL}/dns/${periode}/${annee}`)
      return this.resp
    } catch (error) {
      throw error
    }
  }
}

const InstaceDnsService = new DnsService()
export default InstaceDnsService
