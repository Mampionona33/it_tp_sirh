import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listJourFerier: [],
  listDateDebutDateFin: {
    jan: {
      dateDebut: '22',
      dateFin: '21',
    },
    feb: {
      dateDebut: '22',
      dateFin: '21',
    },
    mar: {
      dateDebut: '22',
      dateFin: '21',
    },
    apr: {
      dateDebut: '22',
      dateFin: '21',
    },
    may: {
      dateDebut: '22',
      dateFin: '21',
    },
    jun: {
      dateDebut: '22',
      dateFin: '21',
    },
    jul: {
      dateDebut: '22',
      dateFin: '21',
    },
    aug: {
      dateDebut: '22',
      dateFin: '21',
    },
    sep: {
      dateDebut: '22',
      dateFin: '21',
    },
    oct: {
      dateDebut: '22',
      dateFin: '21',
    },
    nov: {
      dateDebut: '22',
      dateFin: '21',
    },
    dec: {
      dateDebut: '22',
      dateFin: '21',
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
