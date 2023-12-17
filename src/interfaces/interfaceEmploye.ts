export interface IEmploye {
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  adresse: string
  tel: string
  email: string
  num_cin: string
  genre: string
  contact_urgence: ContactUrgence[]
  conjoint: Conjoint
  enfant: Enfant[]
  titre_poste: string
  matricule: string
  categorie: string
  date_embauche: string
  departement: string
  lieu_travail: string
  est_cadre: boolean
  travail_de_nuit: boolean
  salaire_du_mois: number
  rib: string
  mode_payement_salaire: string
  num_cnaps: string
  num_osie: string
  prime_et_avantage_permanent: PrimeEtAvantagePermanent[]
  depart: Depart
}

export interface ContactUrgence {
  nom: string
  prenom: string
  tel: string
}

export interface Conjoint {
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  adresse: string
  num_cin: string
  tel: string
  email: string
}

export interface Enfant {
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  genre: number
}

export interface PrimeEtAvantagePermanent {
  libelle: string
  montant: number
}

export interface Depart {
  date: any
  motif: any
}
