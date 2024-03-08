import { createOmsi, getOmsiByPeriodeYear } from '../controllers/omsi.controller'
import { Router } from 'express'

const omsiRouter = Router()

omsiRouter.post('/omsi', createOmsi)
omsiRouter.get('/omsi/:annee/:periode', getOmsiByPeriodeYear)

export default omsiRouter
