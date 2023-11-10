const db = require('../src/db/db.json')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get('/employees/list', (req, res) => {
  console.log(req.body)
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
  console.log(`server start on PORT :${PORT}`)
})
