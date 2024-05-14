import { BaseReduxState } from './interfaceDeBaseReduxState'

export interface ICategorieEmployeState extends BaseReduxState {
  data: ICatEmployeDataProps[] | []
}

export interface ICatEmployeDataProps {
  id: number | string
  value: string
  label: string
}
