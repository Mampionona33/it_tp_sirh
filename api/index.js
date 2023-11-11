const db = require('../src/db/db.json')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const corsOptions = {
  origin: [
    'https://3000-mampionona33-ittpsirh-w8k12dobh7e.ws-eu106.gitpod.io',
    'http://localhost:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200, // Fix the typo here
}

app.use(cors(corsOptions))

app.get('/employees/list', (req, res) => {
  res.status(200).send(db['/employees'])
})

app.get('/employees/id=:id', (req, res) => {
  const { id } = req.params
  const employee = db['/employees'].find((emp) => emp.id === parseInt(id))

  if (employee) {
    res.status(200).json(employee)
  } else {
    res.status(404).send('Employee not found')
  }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
