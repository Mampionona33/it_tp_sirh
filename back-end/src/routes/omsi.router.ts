import { createOrUpdateOmsi, getOmsiByPeriodeYear } from '../controllers/omsi.controller'
import { Router } from 'express'

const omsiRouter = Router()

omsiRouter.post('/declaration-omsi', createOrUpdateOmsi)
omsiRouter.get('/declaration-omsi/:annee/:periode', getOmsiByPeriodeYear)

export default omsiRouter
