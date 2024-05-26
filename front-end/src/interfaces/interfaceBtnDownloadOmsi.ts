export interface IBtnDownloadOmsiProps {
  data?: DataOmsiProps[]
  periode?: {
    label: string
    value: string
  }
  annee?: {
    label: string
    value: number
  }
}

export interface DataOmsiProps {
  annee: string
  periode: string
  matricule: string
  nom: string
  prenom?: string | null
  num_cnaps?: string | null
  date_embauche: string
  date_debauche?: string
  genre: string
  salaires: {
    salaire_mois_1?: number
    salaire_mois_2?: number
    salaire_mois_3?: number
  }
}
