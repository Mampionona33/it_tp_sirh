const db = require('../db/db.json')

class DnsControllers {
  constructor() {

  }
  
  isT1(req, res) {
    req.periode = 't1' // 01; 02; 03 + annee = anne_poi
  }
  isT2(req, res) {
    req.periode = 't2'// 04; 05; 06
  }
  isT3(req, res) {
    req.periode = 't3'// 07; 08; 09
  }

  fetchDns = (req, res) => {
    periode: req.periode
    annee: req.annee

    // find db["dns"] annee_mois suivant periode
  }
}
