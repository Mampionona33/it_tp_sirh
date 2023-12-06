const db = require('../db/db.json')

class EmployeurControllers {
  getEmployeur = (req, res) => {
    console.log(req)
    res.status(200).json(db['employeur'])
  }
}

module.exports = EmployeurControllers
