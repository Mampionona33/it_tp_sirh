import { getHistoriquePaieByIdYear } from '../controllers/historiquePaie.controller'
import { Router } from 'express'

const historiquePaieRouter = Router()

historiquePaieRouter.get('/historique-paie/:id/:annee', getHistoriquePaieByIdYear)

export default historiquePaieRouter
