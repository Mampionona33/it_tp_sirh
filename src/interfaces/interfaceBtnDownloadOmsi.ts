export interface IBtnDownloadOmsiProps {
  data?: dataOmsiProps[]
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
  cotisations: {
    mois_1: number
    mois_2: number
    mois_3: number
  }
  cotis_trav: number
}
