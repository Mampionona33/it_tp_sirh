import { getAllEmployes } from '../controllers/employes.controller'
import { Router } from 'express'

const employesRouter = Router()

employesRouter.get('/personnels', getAllEmployes)

export default employesRouter
