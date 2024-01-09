import { EnumBoolean } from './interfaceEmploye'

export interface IHistoriquePaieProps {
  annee?: number
  matricule?: string
  mois?: string
  salarie_id?: string
  validation_status?: EnumBoolean
}

// export interface IHistoriquePaieProps {
//   id: number
//   id_employe: number | string
//   date: string
//   validationDay?: string
//   salaire_brut: number
//   salaire_net: number
//   status: EnumBoolean
// }
