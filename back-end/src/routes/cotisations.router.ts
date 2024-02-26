import { Router } from 'express'
import {
  createCotisation,
  deleteCotisation,
  getAllCotisation,
  updateCotisation,
  getCotisationCnaps,
} from '../controllers/cotisations.controller'

const cotisationRouter = Router()

// GET all cotisations
cotisationRouter.get('/cotisations', getAllCotisation)

cotisationRouter.get('/taux-cnaps/all', getCotisationCnaps)

// POST a new cotisation
cotisationRouter.post('/cotisations', createCotisation)

cotisationRouter.put('/cotisations/:id', updateCotisation)

cotisationRouter.delete('/cotisations/:id', deleteCotisation)

export default cotisationRouter
