import { createEmploye, getAllEmployes, updateEmploye } from '../controllers/employes.controller'
import { Router } from 'express'

const employesRouter = Router()

employesRouter.get('/personnels', getAllEmployes)
employesRouter.post('/personnels/ajout', createEmploye)
employesRouter.post('updatepersonnel/:id', updateEmploye)

export default employesRouter
