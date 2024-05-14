import { BaseReduxState } from './interfaceDeBaseReduxState'

export interface authReducerProps extends BaseReduxState {
  user: unknown
  isAuthenticated: boolean
}
