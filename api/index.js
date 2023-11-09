const express = require('express')
const app = express()
const db = require('../src/db/db.json')

app.get('/employee/list', (req, res) => {
  res.status(200).json(db['/employees'])
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`server start on PORT :${PORT}`)
})
