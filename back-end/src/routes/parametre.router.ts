import { Router } from 'express'
import {
  createParametre,
  deleteParametre,
  getParametre,
  updateParametre,
} from '../controllers/parametre.controller'

const parametreRouter = Router()

parametreRouter.get('/parametre', getParametre)
parametreRouter.post('/parametre', createParametre)
parametreRouter.put('/parametre/', updateParametre)
parametreRouter.delete('/parametre/:id', deleteParametre)

export default parametreRouter
