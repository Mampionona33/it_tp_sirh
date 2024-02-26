import { Router } from 'express'
import {
  createCotisation,
  deleteCotisation,
  getAllCotisation,
  updateCotisation,
} from '../controllers/cotisations.controller'

const cotisationRouter = Router()

// GET all cotisations
cotisationRouter.get('/cotisations', getAllCotisation)

// POST a new cotisation
cotisationRouter.post('/cotisations', createCotisation)

cotisationRouter.put('/cotisations/:id', updateCotisation)

cotisationRouter.delete('/cotisations/:id', deleteCotisation)

export default cotisationRouter
