const db = require('./db/db.json')
const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const fs = require('fs')
const { parseISO, isWithinInterval, parse } = require('date-fns')
const asyncHandler = require('express-async-handler')
const employeurRoutes = require('./routes/employeurRoutes.js')
const dnsRoutes = require('./routes/dnsRoutes')
app.use(express.json())

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

// app.use((req, res, next) => {
//   console.log('Request received with headers:', req.headers)
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   console.log('Response headers set:', res.getHeaders())
//   next()
// })

const isValidCredential = (email, password) => {
  return db.users.some((user) => user.email === email && user.password === password)
}

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (isValidCredential(email, password)) {
    res.send('Connecté')
  } else {
    res.status(401).send('Identifiants incorrects!')
  }
})

app.get('/personnels', cors(corsOptions), (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  res.status(200).send(db['/employees'])
})

app.get('/cotisations/all', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.status(200).send(db['/cotisations'])
})

app.post(
  '/personnels/ajout',
  asyncHandler(async (req, res) => {
    try {
      // Deep copy using Lodash (if needed)
      // const entry = _.cloneDeep(req.body);

      // Shallow copy (as in your original code)
      const entry = { ...req.body }

      const newEntryId = Math.max(...db['/employees'].map((employee) => employee.id)) + 1
      entry.id = newEntryId

      db['/employees'].push(entry)
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

      fs.writeFileSync('./db/db.json', JSON.stringify(db))
      res.status(201).send(db['/employees'])
    } catch (error) {
      console.error('Error:', error)
      res.status(500).send('Internal Server Error')
    }
  }),
)

app.get('/avances/id=:id&&dateDebut=:dateDebut&&dateFin=:dateFin', (req, res) => {
  const avances = db['avances'].filter((av) => {
    const avDate = parseISO(av.date)
    const startDate = parseISO(req.params.dateDebut)
    const endDate = parseISO(req.params.dateFin)

    return (
      av.id === parseInt(req.params.id) &&
      isWithinInterval(avDate, { start: startDate, end: endDate })
    )
  })

  res.status(200).send(avances)
})

app.get('/employees/id=:id', (req, res) => {
  const { id } = req.params
  const employee = db['/employees'].find((emp) => emp.id === parseInt(id))

  if (employee) {
    res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.status(200).json(employee)
  } else {
    res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.status(404).send('Employee not found')
  }
})

const formatDate = (date) => {
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date())
  return parsedDate
}

app.post('/heuressupplementaires', (req, res) => {
  const matricule = req.body.matricule
  const dateDebutString = req.body.dateDebut
  const dateFinString = req.body.dateFin

  const formatedDateDebut = formatDate(dateDebutString)
  const formatedDateFin = formatDate(dateFinString)

  const data = db['/employeeHours']
    .map((employHrs) => {
      const formatedEmployerDate = formatDate(employHrs.date)
      console.log(typeof matricule)
      console.log(formatedDateDebut)
      console.log(formatedDateFin)
      console.log(formatedEmployerDate)
      if (
        employHrs.employee.matricule === matricule &&
        formatedDateDebut <= formatedEmployerDate &&
        formatedDateFin >= formatedEmployerDate
      ) {
        return employHrs
      } else {
        return null
      }
    })
    .filter((item) => item !== null)

  res.status(200).json(data)
})

app.get('/mouvement-salaire', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return res.status(200).send(db['mouvementSalaire'])
})

app.route('/employeurs').get(employeurRoutes)
app.route('/dns/t1/:annee').get(dnsRoutes)

const PORT = process.env.API_PORT || 8000

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
