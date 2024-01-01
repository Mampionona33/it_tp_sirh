export interface ICategorieEmployeState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  data: IdataProps[] | []
}

interface IdataProps {
  id: number | string
  value: string
  label: string
}
