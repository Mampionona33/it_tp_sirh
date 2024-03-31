import mongoose, { Schema } from 'mongoose'

export const HeuresSupplementaire = new Schema({
  annee: { type: String, required: true },
  mois: { type: String, required: true },
  matricule: { type: String, required: true },
  name: { type: String },
  hNormal: { type: Number },
  hFerier: { type: Number },
  hsNuit: { type: Number },
  hs: { type: Number },
  hsi: { type: Number },
  hsni: { type: Number },
  hsni130: { type: Number },
  hsni150: { type: Number },
})

const HeuresSupplementaireModel = mongoose.model(
  'heuresSupplementaires',
  HeuresSupplementaire,
  'heuresSupplementaires',
)

export default HeuresSupplementaireModel
