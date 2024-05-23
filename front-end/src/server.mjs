import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

if (!process.env.PORT) {
  throw new Error('PORT environment variable is not set')
}

if (!process.env.HOST) {
  throw new Error('HOST environment variable is not set')
}

const PORT = parseInt(process.env.PORT)
const HOST = process.env.HOST

// Obtenir le chemin absolu du répertoire courant
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Servir les fichiers statiques du dossier 'build'
app.use(express.static(path.join(__dirname, 'build')))

// Pour toutes les requêtes GET, renvoyer le fichier 'index.html' du dossier 'build'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
