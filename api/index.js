const db = require('../src/db/db.json')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const corsOptions = {
  origin: [
    'https://3000-mampionona33-ittpsirh-w8k12dobh7e.ws-eu106.gitpod.io',
    'http://localhost:3000',
    'https://rv8tjn-8000.csb.app',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors())

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

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
