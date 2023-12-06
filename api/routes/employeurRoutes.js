const express = require('express')
const path = require('path')
// const EmployeurControllers = require(path.join(__dirname, '../controllers/EmployeurControllers'))
const EmployeurControllers = require('../controllers/EmployeurControllers')

const employeurControllers = new EmployeurControllers()
const router = express.Router()

router.get('/employeur', employeurControllers.getEmployeur)

module.exports = router
