import { BaseReduxState } from './interfaceDeBaseReduxState'

export interface IPageIrsaProps extends Partial<BaseReduxState> {
  data: IPageIrsaState
  fetchData?: boolean
}

export interface IPageIrsaState {
  mois: {
    label?: string
    value?: number
  }
  annee: {
    label?: string
    value?: number
  }
}
