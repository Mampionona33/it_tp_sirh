import { Router } from 'express'
import { createIrsa, getAllIrsa, getIrsaByYearMonth } from '../controllers/irsa.controller'

const irsaRouter = Router()

irsaRouter.get('/irsa', getAllIrsa)
irsaRouter.get('/irsa/:year/:month', getIrsaByYearMonth)
irsaRouter.post('/irsa', createIrsa)

export default irsaRouter
