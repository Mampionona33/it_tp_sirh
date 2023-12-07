const db = require('../db/db.json')

class DnsControllers {
  constructor() {}

  fetchDns = (req, res) => {
    const periode = req.periode
    const annee = req.annee

    console.log('periode', periode, annee)

    res.status(200).send('hello world')
  }
}

module.exports = new DnsControllers()
