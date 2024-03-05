export interface IBtnDownloadIrsaProps {
  data: irsaProps[]
  mois?: string
  annee?: string
}

export interface irsaProps {
  id: string
  year: string
  month: string
  matricule: string
  num_cnaps: string
  nom_prenom: string
  cin: string
  date_embauche: string
  date_debauche: string
  fonction: string
  salaire_de_base: number
  indemnite_imposables?: number
  indemnite_non_imposables?: number
  avantage_nature_imposables?: number
  temps_de_presence: number
  heures_supplementaires: number
  prime_gratification?: number
  autres_avantages?: number
  salaire_brut: number
  cnaps: number
  ostie: number
  salaire_net: number
  montant_imposable: number
  impo_correspondant: number
  reduction_charge_famille?: number
  impot_du: number
  createdAt?: string
  updatedAt?: string
}
