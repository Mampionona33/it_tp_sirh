const db = require('../db/db.json')

class DnsControllers {
  constructor() {}

  fetchDns = (req, res) => {
    res.status(200).send('hello world')
  }
}

module.exports = new DnsControllers()
