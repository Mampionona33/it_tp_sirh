const db = require('../db/db.json')

class DnsControllers {
  constructor() {
    this.db = db
  }

  fetchDns = (req, res) => {
    const { annee, periode } = req.params

    const data = this.db['dns'].map((dns) => {
      const travailleurs = dns.travailleur.filter((trav) => {
        return trav.trimestre === periode && trav.annee === annee
      })

      return { travailleurs, employeur: dns.employeur, cotisation: dns.cotisation }
    })

    res.status(200).json(data)
  }
}

module.exports = new DnsControllers()
