import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPageIrsaProps } from '@src/interfaces/intefacePageIrsa'

const initialState: IPageIrsaProps = {
  data: {
    mois: {
      label: undefined,
      value: 0,
    },
    annee: {
      label: undefined,
      value: 0,
    },
  },
  fetchData: false,
  loading: 'idle',
  error: null,
}

const formPageIrsaSlice = createSlice({
  name: 'pageIrsa',
  initialState,
  reducers: {
    setFormPageIrsa: (state, action: PayloadAction<IPageIrsaProps>) => {
      return { ...state, ...action.payload }
    },
    resetFormPageIrsa: (state) => {
      return initialState
    },
  },
})

export const { setFormPageIrsa, resetFormPageIrsa } = formPageIrsaSlice.actions

export default formPageIrsaSlice.reducer
