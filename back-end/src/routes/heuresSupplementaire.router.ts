import { Router } from 'express'
import {
  createHeuresSupplementaire,
  getSalarieHsByYearMonthMatricule,
} from '../controllers/heuresSupplementaires.controller'

const heuresSupplementaireRouter = Router()

heuresSupplementaireRouter.post('/importheures/ajout', createHeuresSupplementaire)
heuresSupplementaireRouter.get(
  '/importheures/:annee/:mois:/:matricule',
  getSalarieHsByYearMonthMatricule,
)

export default heuresSupplementaireRouter
