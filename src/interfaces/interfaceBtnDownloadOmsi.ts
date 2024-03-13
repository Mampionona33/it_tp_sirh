export interface IBtnDownloadOmsiProps {
  data?: dataOmsiProps[]
  periode?: {
    label: string
    value: string
  }
  annee?: {
    label: string
    value: number
  }
}

export interface dataOmsiProps {
  annee: string
  periode: string
  matricule: string
  nom: string
  prenom: string
  num_cnaps: string
  date_embauche: string
  date_debauche?: string
  genre: string
  salaires: {
    salaire_mois_1: number
    salaire_mois_2: number
    salaire_mois_3: number
  }
  cotis_trav: number
}
