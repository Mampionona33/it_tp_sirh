export interface IEmploye {
  id?: number
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  adresse: string
  tel?: string
  email?: string
  num_cin: string
  genre: EnumGenre
  contact_urgence?: ContactUrgence[]
  conjoint?: Conjoint
  enfant?: IEnfantEmploye[]
  titre_poste: string
  matricule: string
  categorie: string
  date_embauche: string
  departement: string
  lieu_travail: string
  est_cadre?: number
  travail_de_nuit: EnumTravailDeNuit
  salaire_de_base: number
  rib?: string
  mode_payement_salaire: string
  num_cnaps?: string
  num_osie?: string
  prime_et_avantage_permanent?: PrimeEtAvantagePermanent[]
  depart?: Depart
  actif: number
}

export enum EnumTravailDeNuit {
  OUI = 'oui',
  NON = 'non',
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

export interface IEnfantEmploye {
  id: number
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  genre: EnumGenre
}

export enum EnumGenre {
  MASCULIN = 'masculin',
  FEMININ = 'feminin',
}

export interface PrimeEtAvantagePermanent {
  id: number
  libelle: string
  montant: number
}

export interface Depart {
  date: any
  motif: any
}
