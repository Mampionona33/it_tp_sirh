import db from '@db/db.json'
import AuthController from '@controllers/AuthController'
import express from 'express'
import MouvementSalaireControllers from '@controllers/MouvementSalaireControllers'
import CotisationController from '@controllers/CotisationControllers'
import EmployeurControllers from '@controllers/EmployeurControllers'
import SalaierControllers from '@controllers/SalariesControllers'
const cors = require('cors')

const app = express()
app.use(express.json())

const router = express.Router()

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}
router.use(cors(corsOptions))

const authController = new AuthController(db)
const mouvementSalaireController = new MouvementSalaireControllers(db)
const cotisationController = new CotisationController(db)
const employeurController = new EmployeurControllers(db)
const salarieController = new SalaierControllers(db)

router.route('/login').post(authController.login)
router.route('/mouvement-salaire').get(mouvementSalaireController.getAll)
router.route('/cotisations/all').get(cotisationController.getAll)
router.route('/employeurs').get(employeurController.getAll)
router.route('/personnels').get(salarieController.getAll)

const PORT = process.env.PORT || 8000

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
