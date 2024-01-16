export interface BaseReduxState {
  loading: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null
}
