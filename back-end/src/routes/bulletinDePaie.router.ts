import { addBulletinDePaie } from '../controllers/bulletinDePaie.controller'
import { Router } from 'express'

const bulletinDePaieRouter = Router()

bulletinDePaieRouter.post('/bulletin-de-paie/ajout/:id', addBulletinDePaie)

export default bulletinDePaieRouter
