// export interface IDnsGeneratorRootProps {
//   data: IDnsGeneratorDataProps[]
// }

export interface IDnsGeneratorDataProps {
  travailleur: IDnsGeneratorTravailleurProps[]
  employeur: IDnsGeneratorEmployeurData[]
}

export interface IDnsGeneratorTravailleurProps {
  id: number
  annee: string
  trimestre: 't1' | 't2' | 't3' | 't4'
  mois: string
  matricule: string
  nom: string
  prenom: string
  date_embauche: string
  date_depart: any
  salaire_du_mois: number
  avantage_du_mois: number
  temps_presence: number
  hs_non_plafonne: number
  plafondSme?: number
  hs_plafonne: number
  num_cnaps: string
  cin: string
  ref_employeur: string
  created_at: any
  taux_cotisation_cnaps_employeur: number
  taux_cotisation_cnaps_salarie: number
  updated_at: any
}

export interface IDnsGeneratorEmployeurData {
  id: number
  nom: string
  numero_rcs: string
  adresse: string
  cp_ville: string
  numero_nif: string
  numero_stat: string
  email: string
  telephone: string
  created_at: any
  updated_at: any
}

export interface Request {}
