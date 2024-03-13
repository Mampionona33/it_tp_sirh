import { Router } from 'express'
import { createIrsa, getAllIrsa, getIrsaByYearMonth } from '../controllers/irsa.controller'

const irsaRouter = Router()

irsaRouter.get('/declaration-irsa', getAllIrsa)
irsaRouter.get('/declaration-irsa/:year/:month', getIrsaByYearMonth)
irsaRouter.post('/declaration-irsa', createIrsa)

export default irsaRouter
