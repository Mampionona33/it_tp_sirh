import { EnumGenre } from './interfaceEmploye'

export interface IImportEmployeProps {
  nom?: string
  prenom?: string
  matricule?: string | number
  'categorie/label'?: string
  'categorie/value'?: string
  date_delivrance_cin?: number
  adresse?: string
  date_embauche?: number
  date_naissance?: number
  departement?: string
  num_cin?: string
  email?: string
  genre: EnumGenre
  num_cnaps?: string
  lieu_naissance?: string
  lieu_travail?: string
  'mode_paiement_salaire/label': string
  'mode_paiement_salaire/value': string
  nom_mere?: string
  nom_pere?: string
  rib?: string
  salaire_de_base?: number
}
