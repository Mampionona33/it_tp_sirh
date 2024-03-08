import mongoose, { Schema } from 'mongoose'

const OmsiSchema = new Schema(
  {
    annee: { type: String, require: true },
    periode: { type: String, require: true },
    matricule: { type: String, unique: true, require: true },
    nom: { type: String, require: true },
    prenom: { type: String },
    num_cnaps: { type: String, unique: true, require: true },
    date_embauche: { type: String, require: true },
    genre: { type: String, require: true },
    date_debauche: { type: String },
    cotisations: {
      mois_1: { type: Number },
      mois_2: { type: Number },
      mois_3: { type: Number },
    },
    cotis_trav: { type: Number },
  },
  {
    timestamps: true,
  },
)

const OmsiModel = mongoose.model('omsi', OmsiSchema, 'omsi')
export default OmsiModel
