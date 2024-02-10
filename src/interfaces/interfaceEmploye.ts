export interface IEmploye {
  id?: string | number
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  date_delivrance_cin: string
  adresse: string
  nom_pere?: string
  nom_mere?: string
  telephone?: string
  email?: string
  num_cin: string
  genre: EnumGenre
  contact_urgence?: ContactUrgence[]
  conjoint?: Conjoint
  enfant?: IEnfantEmploye[]
  titre_poste: string
  matricule: string
  categorie?: IInputWithLabelOptionsProps
  date_embauche: string
  departement: string
  lieu_travail: string
  est_cadre?: EnumBoolean
  travail_de_nuit: EnumBoolean
  salaire_de_base: number
  rib?: string
  mode_paiement_salaire: string
  num_cnaps?: string
  num_osie?: string
  prime_et_avantage_permanent?: PrimeEtAvantagePermanent[]
  depart?: Depart
  actif?: EnumBoolean
  indemnites?: {
    transport: number
    autres: number
  }
  avance?: number
}

export enum EnumBoolean {
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
  id: number | string
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  genre_enfant: EnumGenre
  certificat?: EnumCertificatEnfant
  action?: 'ajout' | 'modifier'
}

export enum EnumCertificatEnfant {
  AUCUN = '',
  VIE = 'vie',
  DECE = 'dece',
  SCOLARITE = 'scolarite',
  MEDICAL = 'medical',
}

export enum EnumGenre {
  MASCULIN = 'masculin',
  FEMININ = 'feminin',
}

export const genreOptions: IInputWithLabelOptionsProps[] = [
  { label: 'Masculin', value: EnumGenre.MASCULIN },
  { label: 'Feminin', value: EnumGenre.FEMININ },
]

export interface PrimeEtAvantagePermanent {
  id: number
  libelle: string
  montant: number
}

export interface IInputWithLabelOptionsProps {
  id?: string | number
  label: string | number
  value: string
}

export interface Depart {
  date: string
  motif: string
}
