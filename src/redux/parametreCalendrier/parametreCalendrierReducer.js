import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listJourFerier: [],
  listDateDebutDateFin: {
    jan: {
      dateDebut: '22',
      dateFin: '22',
    },
    feb: {
      dateDebut: '22',
      dateFin: '22',
    },
    mar: {
      dateDebut: '22',
      dateFin: '22',
    },
    apr: {
      dateDebut: '22',
      dateFin: '22',
    },
    may: {
      dateDebut: '22',
      dateFin: '22',
    },
    jun: {
      dateDebut: '22',
      dateFin: '22',
    },
    jul: {
      dateDebut: '22',
      dateFin: '22',
    },
    aug: {
      dateDebut: '22',
      dateFin: '22',
    },
    sep: {
      dateDebut: '22',
      dateFin: '22',
    },
    oct: {
      dateDebut: '22',
      dateFin: '22',
    },
    nov: {
      dateDebut: '22',
      dateFin: '22',
    },
    dec: {
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
