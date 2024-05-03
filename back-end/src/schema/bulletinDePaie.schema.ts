import mongoose, { Schema } from 'mongoose'

const certificatSchema = new Schema({
  label: String,
  value: String,
})

const enfantSchema = new Schema({
  certificat: certificatSchema,
  id: String,
  nom: String,
  prenom: String,
  lieu_naissance: String,
  date_naissance: Date,
  genre_enfant: String,
})

const modePaiementSchema = new Schema({
  label: String,
  value: String,
})

const categorieSchema = new Schema({
  label: String,
  value: String,
})

const avantagesSchema = new Schema({
  domestique: Number,
  logement: Number,
  vehicule: Number,
  autresAvantages: Number,
})

const bulletinDePaieSchema = new Schema({
  validation: {
    status: String,
    date: Date,
    day: Date,
  },
  employeur: {
    nom: String,
    adresse: String,
    CP_et_Ville: String,
    nif: String,
    stat: String,
    rcs: String,
  },
  salarie: {
    _id: String,
    actif: String,
    adresse: String,
    categorie: categorieSchema,
    date_delivrance_cin: Date,
    date_embauche: Date,
    date_naissance: Date,
    departement: String,
    email: String,
    enfant: [enfantSchema],
    est_cadre: String,
    genre: String,
    lieu_naissance: String,
    lieu_travail: String,
    matricule: String,
    mode_paiement_salaire: modePaiementSchema,
    nom: String,
    nom_mere: String,
    nom_pere: String,
    num_cin: String,
    num_cnaps: String,
    prenom: String,
    rib: String,
    salaire_de_base: Number,
    telephone: String,
    titre_poste: String,
    travail_de_nuit: String,
    __v: Number,
    id: String,
  },
  dateDeVirement: Date,
  salaireDeBase: Number,
  valReductionChargeEnfants: Number,
  montanReductionChargeParEnfant: Number,
  totalHn: Number,
  totalHs: Number,
  totalHs130: Number,
  totalHs150: Number,
  hsni130: Number,
  hsni150: Number,
  hsi130: Number,
  hsi150: Number,
  totalHs30: Number,
  totalHs50: Number,
  totalHDim: Number,
  totalHFerie: Number,
  valHsni130: Number,
  valHsni150: Number,
  valHsi130: Number,
  valHsi150: Number,
  valHs30: Number,
  valHs50: Number,
  valHdim: Number,
  valHFerie: Number,
  totalPrimeEtAvantage: Number,
  totalDeduction: Number,
  tauxCnaps: Number,
  tauxOsie: Number,
  baseCnaps: Number,
  avance: {
    quinzaine: Number,
    speciale: Number,
  },
  reduChargeFamil: Number,
  baseIrsa: Number,
  baseIrsaArrondi: Number,
  salaireBrut: Number,
  salaireNet: Number,
  osie: Number,
  salaireNetAPayer: Number,
  valMinIrsaParTranche: Number,
  plafondSME: Number,
  irsaAPayer: Number,
  cnaps: Number,
  rappel: Number,
  indemnites: {
    transport: Number,
    autresIndemnite: Number,
  },
  totalIndemnite: Number,
  primeEtGratification: {
    assiduite: Number,
    excellence: Number,
  },
  totalPrimeEtGratification: Number,
  deductions: {
    absence: Number,
    retard: Number,
  },
  avantages: avantagesSchema,
  totalAvantages: Number,
  domestique: Number,
  logement: Number,
  vehicule: Number,
  autresAvantages: Number,
})

const BulletinDePaie = mongoose.model('bulletinDePai', bulletinDePaieSchema, 'bulletinDePai')

export default BulletinDePaie
