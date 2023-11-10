const db = require('../src/db/db.json')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get('/employees/list', (req, res) => {
  console.log(req.body)
  res.status(200).json(db['/employees'])
})

app.get('/employees/id=:id', (req, res) => {
  const id = parseInt(req.params.id)
  console.log('Requested ID:', id)

  const key = `/employees.id:${id}`

  if (db.hasOwnProperty(key)) {
    console.log('Data for ID:', db[key])
    res.status(200).json(db[key])
  } else {
    console.log('Data not found for ID:', id)
    res.status(404).json({ error: 'Data not found' })
  }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`server start on PORT :${PORT}`)
})
