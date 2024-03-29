import {
  createModeDePayement,
  getAllModeDePayement,
} from '../controllers/modeDePaiement.controller'
import { Router } from 'express'

const modeDePayementRouter = Router()

modeDePayementRouter.post('/mode-de-payement', createModeDePayement)

modeDePayementRouter.get('/mode-de-payement', getAllModeDePayement)

export default modeDePayementRouter
