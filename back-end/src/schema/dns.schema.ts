const mongoose = require('mongoose')

const employeurSchema = new mongoose.Schema({
  id: Number,
  nom: String,
  numero_rcs: String,
  adresse: String,
  cp_ville: String,
  numero_nif: String,
  numero_stat: String,
  email: String,
  telephone: String,
  created_at: Date,
  updated_at: Date,
})

const travailleurSchema = new mongoose.Schema(
  {
    id: Number,
    annee: String,
    avantage_du_mois: Number,
    cin: String,
    date_depart: Date,
    date_embauche: Date,
    hs_non_plafonne: Number,
    hs_plafonne: Number,
    matricule: String,
    mois: String,
    nom: String,
    num_cnaps: String,
    prenom: String,
    ref_employeur: String,
    salaire_du_mois: Number,
    taux_cotisation_cnaps_employeur: Number,
    taux_cotisation_cnaps_salarie: Number,
    temps_presence: Number,
    trimestre: String,
  },
  {
    timestamps: true,
  },
)

const DnsSchema = new mongoose.Schema(
  {
    employeur: [employeurSchema],
    travailleur: [travailleurSchema],
  },
  {
    timestamps: true,
  },
)

const DnsModel = mongoose.model('Dns', DnsSchema, 'dns')

export default DnsModel
