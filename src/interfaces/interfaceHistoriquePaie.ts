import { EnumBoolean } from './interfaceEmploye'

export interface IHistoriquePaieProps {
  id: number
  id_employe: number | string
  date: string
  salaire_brut: number
  salaire_net: number
  status: EnumBoolean
}
