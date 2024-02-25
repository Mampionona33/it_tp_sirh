import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const MONGO_URI = process.env.MONGO_URI

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
