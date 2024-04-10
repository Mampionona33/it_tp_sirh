const mongoose = require('mongoose')

// Définition du schéma Mongoose pour les cotisations
const CotisationSchema = new mongoose.Schema({
  name: String,
  part_employeur: Number,
  part_salarie: Number,
})

// Définition du schéma Mongoose pour les cértificats
const CertificatSchema = new mongoose.Schema({
  label: String,
  value: String,
})

// Définition du schéma Mongoose pour les périodes mensuelles
const PeriodeDuMois = new mongoose.Schema({
  month: Number,
  jour_debut: String,
  jour_fin: String,
})

// Définition du schéma Mongoose pour les catégories des salariés
const CategorieSchema = new mongoose.Schema({
  label: String,
  value: String,
})

// Définition du schéma Mongoose pour les mode de paiements des salaires
const ModeDePaiementSchema = new mongoose.Schema({
  label: String,
  value: String,
})

// Définition du schéma Mongoose pour les paramètres de paie
const ParametreGenelalSchema = new mongoose.Schema({
  plafond_sme: Number,
  reduction_charge_par_enfant: Number,
  cotisations: [CotisationSchema],
  periode_mensuelle: [PeriodeDuMois],
  categorie_salarie: [CategorieSchema],
  mode_de_payement: [ModeDePaiementSchema],
  certificats: [CertificatSchema],
})

// Création du modèle Mongoose pour les paramètres de paie
const ParametreGeneral = mongoose.model(
  'ParametreGeneral',
  ParametreGenelalSchema,
  'parametreGeneral',
)

export default ParametreGeneral
