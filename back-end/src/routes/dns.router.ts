import { addDns, createDns, getDnsByYearPeriod } from '../controllers/dns.controller'
import { Router } from 'express'

const dnsRouter = Router()

dnsRouter.post('/dns', addDns)
dnsRouter.get('/dns/:annee/:periode', getDnsByYearPeriod)
dnsRouter.put('/dns/:annee/:periode')

export default dnsRouter
