import mongoose, { Schema } from 'mongoose'

// Définir le schéma pour les données des enfants
const EnfantSchema = new Schema({
  certificat: {
    label: String,
    value: String,
  },
  id: String,
  nom: String,
  prenom: String,
  lieu_naissance: String,
  date_naissance: Date,
  genre_enfant: String,
})

// Définir le schéma principal pour les données de l'employé
const EmployeSchema = new Schema({
  actif: String,
  adresse: String,
  categorie: {
    label: String,
    value: String,
  },
  created_at: Date,
  date_delivrance_cin: Date,
  date_embauche: Date,
  date_naissance: Date,
  depart: String,
  departement: String,
  email: String,
  enfant: [EnfantSchema], // Utilisation du schéma des enfants défini précédemment
  est_cadre: String,
  genre: String,
  id: Number,
  lieu_naissance: String,
  lieu_travail: String,
  matricule: String,
  mode_paiement_salaire: {
    label: String,
    value: String,
  },
  nom: String,
  nom_mere: String,
  nom_pere: String,
  num_cin: String,
  num_cnaps: String,
  num_osie: String,
  prenom: String,
  prime_et_avantage_premanent: Number,
  rib: String,
  salaire_de_base: Number,
  telephone: String,
  titre_poste: String,
  travail_de_nuit: String,
  updated_at: Date,
})

// Créer le modèle à partir du schéma
const EmployeModel = mongoose.model('Employe', EmployeSchema, 'employes')

export default EmployeModel
