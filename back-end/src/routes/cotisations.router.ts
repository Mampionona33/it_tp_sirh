import { Router } from 'express'
import { createCotisation, getAllCotisation } from '../controllers/cotisations.controller'

const cotisationRouter = Router()

// GET all cotisations
cotisationRouter.get('/cotisations', getAllCotisation)

// POST a new cotisation
cotisationRouter.post('/cotisations', createCotisation)

export default cotisationRouter
