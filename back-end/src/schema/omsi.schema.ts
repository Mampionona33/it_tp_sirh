import mongoose, { Schema } from 'mongoose'

const OmsiSchema = new Schema(
  {
    annee: { type: String, require: true },
    periode: { type: String, require: true },
    matricule: { type: String, require: true },
    nom: { type: String, require: true },
    prenom: { type: String },
    num_cnaps: { type: String, require: true },
    date_embauche: { type: String, require: true },
    genre: { type: String, require: true },
    date_debauche: { type: String },
    salaires: {
      salaire_mois_1: { type: Number },
      salaire_mois_2: { type: Number },
      salaire_mois_3: { type: Number },
    },
  },
  {
    timestamps: true,
  },
)

const OmsiModel = mongoose.model('omsi', OmsiSchema, 'omsi')
export default OmsiModel
