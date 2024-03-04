import mongoose, { Schema } from 'mongoose'

const IrsaSchema = new Schema(
  {
    year: { type: String, require: true },
    month: { type: String, require: true },
    matricule: { type: String, unique: true, require: true },
    num_cnaps: { type: String, unique: true, require: true },
    nom_prenom: { type: String, require: true },
    cin: { type: String, unique: true, require: true },
    fonction: { type: String, require: true },
    salaire_de_base: { type: Number, require: true },
    indemnite_imposables: { type: Number },
    avantage_nature_imposables: { type: Number },
    temps_de_presence: { type: Number },
    heures_supplementaires: { type: Number },
    prime_gratification: { type: Number },
    autres_avantages: { type: Number },
    salaire_brut: { type: Number, require: true },
    cnaps: { type: Number, require: true },
    ostie: { type: Number },
    salaire_net: { type: Number, require: true },
    montant_imposable: { type: Number },
    impo_correspondant: { type: Number },
    reduction_charge_famille: { type: Number },
    impot_du: { type: Number },
  },
  {
    timestamps: true,
  },
)

const IrsaModel = mongoose.model('Irsa', IrsaSchema, 'irsas')

export default IrsaModel
