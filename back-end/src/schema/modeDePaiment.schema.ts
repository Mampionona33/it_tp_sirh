import mongoose, { Schema } from 'mongoose'

const modeDePayementSchema = new Schema({
  label: { type: String, unique: true, require: true },
  value: { type: String, unique: true, require: true },
})

const ModeDePayement = mongoose.model('modeDePayement', modeDePayementSchema, 'modeDePayement')
export default ModeDePayement
