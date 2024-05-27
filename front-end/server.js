const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

if (!process.env.PORT) {
  throw new Error('PORT environment variable is not set')
}

if (!process.env.HOST) {
  throw new Error('HOST environment variable is not set')
}

const PORT = parseInt(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Servir les fichiers statiques du dossier 'build'
app.use(express.static(path.join(__dirname, 'build')))

// Pour toutes les requêtes GET, renvoyer le fichier 'index.html' du dossier 'build'
app.get('*', (req, res) => {
  console.log(req.url)
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
