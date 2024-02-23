import { getAllCotisation } from '@controllers/cotisation.controller'
import { Router } from 'express'

const cotisationsRouter = Router()

cotisationsRouter.get('/', getAllCotisation)

export default cotisationsRouter
