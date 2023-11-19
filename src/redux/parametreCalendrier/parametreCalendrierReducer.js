import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listJourFerier: [],
  listDateDebutDateFin: {
    janvier: {
      dateDebut: '22',
      dateFin: '22',
    },
    fevrier: {
      dateDebut: '22',
      dateFin: '22',
    },
    avril: {
      dateDebut: '22',
      dateFin: '22',
    },
    mais: {
      dateDebut: '22',
      dateFin: '22',
    },
    juin: {
      dateDebut: '22',
      dateFin: '22',
    },
    juillet: {
      dateDebut: '22',
      dateFin: '22',
    },
    aout: {
      dateDebut: '22',
      dateFin: '22',
    },
    septembre: {
      dateDebut: '22',
      dateFin: '22',
    },
    octobre: {
      dateDebut: '22',
      dateFin: '22',
    },
    novembre: {
      dateDebut: '22',
      dateFin: '22',
    },
    decembre: {
      dateDebut: '22',
      dateFin: '22',
    },
  },
}

const parametreCalendrierSlice = createSlice({
  name: 'parametreCalendrier',
  initialState,
  reducers: {
    setParametreCalendrier: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetParametreCalendrier: (state) => initialState,
  },
})

export const { setParametreCalendrier, resetParametreCalendrier } = parametreCalendrierSlice.actions

export default parametreCalendrierSlice.reducer
