import express, { Express, NextFunction, Request, Response } from 'express'
import cotisationRouter from './routes/cotisations.router'
import modeDePayementRouter from './routes/modeDePaiement.router'
import connectToMongoDB from './db'
import dotenv from 'dotenv'
import categorieRouter from './routes/categorie.router'

dotenv.config({ path: './.env' })

const app: Express = express()
// Middleware pour parser les corps de requête JSON
app.use(express.json())

const port = process.env.PORT || 8000

connectToMongoDB()
app.use(express.urlencoded({ extended: true }))

app.get('/api', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/api', cotisationRouter, modeDePayementRouter, categorieRouter)

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // error && error instanceof Error && error.stack
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
