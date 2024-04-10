import { Router } from 'express'
import {
  createParametre,
  deleteParametre,
  getParametre,
  updateParametre,
} from '../controllers/parametre.controller'

const parametreRouter = Router()

parametreRouter.get('/parametres', getParametre)
parametreRouter.post('/parametres', createParametre)
parametreRouter.post('/parametres/modif', updateParametre)
parametreRouter.delete('/parametre/:id', deleteParametre)

export default parametreRouter
