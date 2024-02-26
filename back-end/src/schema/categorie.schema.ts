import mongoose, { Schema } from 'mongoose'

const categorieSchema = new Schema({
  value: { type: String, unique: true, require: true },
  label: { type: String },
})

const Categories = mongoose.model('categoire', categorieSchema, 'categories')

export default Categories
