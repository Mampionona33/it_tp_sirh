import { AxiosError } from 'axios'

export interface BaseReduxState {
  loading: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: AxiosError | null
}
