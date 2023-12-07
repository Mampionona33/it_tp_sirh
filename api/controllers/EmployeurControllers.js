const db = require('../db/db.json')

class EmployeurControllers {
  getEmployeur = (req, res) => {
    res.status(200).json(db['employeur'])
  }
}

module.exports = EmployeurControllers
