import { BaseReduxState } from './interfaceDeBaseReduxState'

export interface IPageIrsaProps extends Partial<BaseReduxState> {
  data: {
    mois: {
      label: string
      value: number | null
    }
    annee: {
      label: string
      value: number | null
    }
  }
  fetchData?: boolean
}
