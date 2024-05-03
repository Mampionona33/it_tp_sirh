import {
  addBulletinDePaie,
  getAllSalariesValidateBulletin,
  getBulletinDePaieByIdYearAndMonth,
} from '../controllers/bulletinDePaie.controller'
import { Router } from 'express'

const bulletinDePaieRouter = Router()

bulletinDePaieRouter.post('/bulletin-de-paie/ajout/:id', addBulletinDePaie)
bulletinDePaieRouter.get('/historique-paie/:id/:annee', getAllSalariesValidateBulletin)
bulletinDePaieRouter.get('/historique-paie/:id/:annee/:mois', getBulletinDePaieByIdYearAndMonth)

export default bulletinDePaieRouter
