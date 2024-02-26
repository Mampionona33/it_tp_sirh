import db from '@db/db.json'
import AuthController from '@controllers/AuthController'
import express from 'express'
import MouvementSalaireControllers from '@controllers/MouvementSalaireControllers'
import CotisationController from '@controllers/CotisationControllers'
import EmployeurControllers from '@controllers/EmployeurControllers'
import SalaierControllers from '@controllers/SalariesControllers'
<<<<<<< HEAD
import HeuresControllers from '@controllers/HeuresControllers'
import CategorieEmployeControllers from '@controllers/CategorieEmployeControllers'
import BulletinDePaieControllers from '@controllers/BulletinDePaieControllers'
import HistoriquePaieController from '@controllers/HistoriquePaieController'
import DnsControllers from '@controllers/DnsControllers'
import ModeDePayementControllers from '@controllers/ModeDePayementControllers'
import TauxCnapsController from '@controllers/TauxCnapsController'
import cotisationsRouter from '@routes/cotisation.router'
=======
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
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
<<<<<<< HEAD
const heuresController = new HeuresControllers(db)
const categorieEmployeController = new CategorieEmployeControllers(db)
const bulletinDePaieController = new BulletinDePaieControllers(db)
const historiquePaieController = new HistoriquePaieController(db)
const dnsControllers = new DnsControllers(db)
const modeDePayementControllers = new ModeDePayementControllers(db)
const tauxCnapsController = new TauxCnapsController(db)

router.route('/login').post(authController.login)
router.route('/mouvement-salaire').get(mouvementSalaireController.getAll)
// router.route('/cotisations/all').get(cotisationController.getAll)
router.route('/employeurs').get(employeurController.getAll)

router.route('/personnels').get(salarieController.getAll)
router.route('/personnels/:id').get(salarieController.getOne)
router.route('/personnels/ajout').post(salarieController.create)
router.route('/updatepersonnel/:id').post(salarieController.update)
router.route('/deletepersonnel/:id').post(salarieController.update)

router.route('/heuressupplementaires').post(heuresController.getOne)
router.route('/categorie-employe').get(categorieEmployeController.getAll)

router.route('/bulletin-de-paie/ajout/:id').post(bulletinDePaieController.create)

router.route('/historique-paie/:id/:annee').get(historiquePaieController.getAllByIdEmployeAndDate)
router.route('/historique-paie/:id/:annee/:mois').get(historiquePaieController.getDetailsById)

router.route('/dns/:annee/:periode').get(dnsControllers.fetchDns)
router.route('/dns').post(dnsControllers.create)

router.route('/mode-de-payement').get(modeDePayementControllers.getAll)
router.route('/mode-de-payement/:value').get(modeDePayementControllers.getOneByVal)

router.route('/taux-cnaps/all').get(tauxCnapsController.getAll)

app.use('/cotisations/all', cotisationsRouter)
=======

router.route('/login').post(authController.login)
router.route('/mouvement-salaire').get(mouvementSalaireController.getAll)
router.route('/cotisations/all').get(cotisationController.getAll)
router.route('/employeurs').get(employeurController.getAll)
router.route('/personnels').get(salarieController.getAll)
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147

const PORT = process.env.PORT || 8000

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
<<<<<<< HEAD

module.exports = app
=======
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
