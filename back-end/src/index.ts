import express, { Express, NextFunction, Request, Response } from 'express'
import cotisationRouter from './routes/cotisations.router'
import modeDePayementRouter from './routes/modeDePaiement.router'
import connectToMongoDB from './db'
import dotenv from 'dotenv'
import categorieRouter from './routes/categorie.router'
import userRouter from './routes/users.router'
import employesRouter from './routes/employes.router'
import irsaRouter from './routes/irsa.router'
import omsiRouter from './routes/omsi.router'
const cors = require('cors')

dotenv.config({ path: './.env' })

const app: Express = express()
// Middleware pour parser les corps de requête JSON
app.use(express.json())

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

const port = process.env.PORT || 8000

connectToMongoDB()
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to la-ligne-scandinave-api server!')
})

app.use(
  '/',
  cotisationRouter,
  modeDePayementRouter,
  categorieRouter,
  userRouter,
  employesRouter,
  irsaRouter,
  omsiRouter,
)

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // error && error instanceof Error && error.stack
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
