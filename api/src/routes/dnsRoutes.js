const express = require('express')
const router = express.Router()

const dnsController = require('../controllers/DnsControllers')

router.get('/', dnsController.fetchDns)

module.exports = router
