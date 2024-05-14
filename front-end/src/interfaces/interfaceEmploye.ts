export interface IEmploye {
  id?: string | number | null
  nom: string
  prenom?: string | null
  date_naissance: string
  lieu_naissance: string
  date_delivrance_cin: string
  adresse: string
  nom_pere?: string | null
  nom_mere?: string | null
  telephone?: string | null
  email?: string | null
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
  rib?: string | null
  mode_paiement_salaire?: IInputWithLabelOptionsProps
  num_cnaps?: string | null
  // prime_et_avantage_permanent?: PrimeEtAvantagePermanent[]
  depart?: Depart | null
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
  prenom?: string
  date_naissance: string
  lieu_naissance: string
  genre_enfant: EnumGenre
  certificat?: CertificatEnfantProps | null
  action?: 'ajout' | 'modifier'
}

export interface CertificatEnfantProps extends IInputWithLabelOptionsProps {
  value: EnumCertificatEnfant
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
  nom_matricule?: string
  date?: string
  motif?: string
}
