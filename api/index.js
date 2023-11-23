const db = require('./db/db.json')
const express = require('express')
const app = express()
const cors = require('cors')
const { parseISO, isWithinInterval, isValid } = require('date-fns')

app.use(express.json())

app.use(cors())

const isValidCredential = (email, password) => {
  return db.users.some((user) => user.email === email && user.password === password)
}

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (isValidCredential(email, password)) {
    res.send('Connecté')
  } else {
    res.status(401).send('Identifiants incorrects')
  }
})

app.get('/listeemployes', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  res.status(200).send(db['/employees'])
})

app.get('/cotisations/all', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow any origin during development
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.status(200).send(db['/cotisations'])
})

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

app.post('/heuressupplementaires', (req, res) => {
  const matricule = req.body.matricule
  const dateDebut = new Date(req.body.dateDebut)
  const dateFin = new Date(req.body.dateFin)

  const data = db['/employeeHours']
    .filter((hours) => {
      const currentDate = new Date(hours.date)

      return (
        isValid(currentDate) &&
        hours.employee.matricule === matricule &&
        currentDate >= dateDebut &&
        currentDate <= dateFin
      )
    })
    .map((hours) => {
      return {
        id: hours.id,
        employee: hours.employee,
        date: hours.date,
        heure_normale: hours.heure_normale,
      }
    })

  console.log(data)

  res.status(200).json(data)
})

app.get('/mouvement-salaire', (req, res) => {
  return res.status(200).send(db['mouvementSalaire'])
})

const PORT = process.env.API_PORT || 8000

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
