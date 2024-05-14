import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFormPageOmsi } from '@src/interfaces/interfaceFormPageOmsi'

const initialState: IFormPageOmsi = {
  periode: undefined,
  annee: undefined,
  fetchData: false,
}

const formPageOmsiSlice = createSlice({
  name: 'pageOmsi',
  initialState,
  reducers: {
    setFormPageOmsi: (state, action: PayloadAction<IFormPageOmsi>) => {
      return { ...state, ...action.payload }
    },
    resetFormPageOmsi: (state) => {
      return initialState
    },
  },
})

export const { setFormPageOmsi, resetFormPageOmsi } = formPageOmsiSlice.actions

export default formPageOmsiSlice.reducer
