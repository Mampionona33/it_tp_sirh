import mongoose, { Schema } from 'mongoose'

const historiquePaieSchema = new Schema({
  salarie_id: { type: Schema.Types.ObjectId, ref: 'Employe', required: true },
  matricule: { type: String, required: true },
  annee: { type: String, required: true },
  validation_status: { type: String },
})

const HistoriquePaieModel = mongoose.model('HistoriquePaie', historiquePaieSchema, 'historiquePaie')

export default HistoriquePaieModel
