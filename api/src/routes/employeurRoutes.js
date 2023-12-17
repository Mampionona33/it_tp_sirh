const express = require('express')
const router = express.Router()

const employeurControllers = require('../controllers/EmployeurControllers')
// const employeurControllers = new EmployeurControllers()

router.get('/', employeurControllers.getEmployeur)

module.exports = router
