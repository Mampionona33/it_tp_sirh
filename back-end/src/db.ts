import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local'
console.log(path.resolve(__dirname, '..', envFile))

dotenv.config({ path: path.resolve(__dirname, '..', envFile) })

const MONGO_URI = process.env.MONGO_URI
console.log('MONGO_URI', MONGO_URI)

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}

const connectToMongoDB = () => {
  mongoose.set('debug', true)
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log(error)
    })
}

export default connectToMongoDB
