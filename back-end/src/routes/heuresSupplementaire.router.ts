import { Router } from 'express'
import { createHeuresSupplementaire } from '../controllers/heuresSupplementaires.controller'

const heuresSupplementaireRouter = Router()

heuresSupplementaireRouter.post('/importheures/ajout', createHeuresSupplementaire)

export default heuresSupplementaireRouter
