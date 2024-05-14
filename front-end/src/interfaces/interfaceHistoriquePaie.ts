import { BaseReduxState } from './interfaceDeBaseReduxState'
import { EnumBoolean } from './interfaceEmploye'

export interface IHistoriquePaieDataProps {
  annee?: number
  matricule?: string
  mois?: string
  salarie_id?: string
  validation_status?: EnumBoolean
}

export interface IHistoriquePaieProps extends BaseReduxState {
  historiques: IHistoriquePaieDataProps[]
  anneeSectionne?: string
}
