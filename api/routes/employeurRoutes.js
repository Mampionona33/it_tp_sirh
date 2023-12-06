const express = require('express')
const router = express.Router()

// Importez directement le contrôleur sans utiliser path.join
const EmployeurControllers = require('../controllers/EmployeurControllers')
const employeurControllers = new EmployeurControllers()

router.get('/', employeurControllers.getEmployeur)

module.exports = router
