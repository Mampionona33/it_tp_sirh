import mongoose, { Schema } from 'mongoose'

const IrsaSchema = new Schema(
  {
    year: { type: String, require: true },
    month: { type: String, require: true },
    matricule: { type: String, require: true },
    num_cnaps: { type: String, require: true },
    nom_prenom: { type: String, require: true },
    cin: { type: String, require: true },
    date_embauche: { type: String, require: true },
    date_debauche: { type: String },
    fonction: { type: String, require: true },
    salaire_de_base: { type: Number, require: true },
    indemnite_imposables: { type: Number },
    indemnite_non_imposables: { type: Number },
    hs_inposables: { type: Number },
    hs_non_exonerables: { type: Number },
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

const IrsaModel = mongoose.model('Irsa', IrsaSchema, 'irsa')

export default IrsaModel
