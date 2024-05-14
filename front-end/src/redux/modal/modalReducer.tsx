import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    resetModal: (state) => initialState,
    setModalOpen: (state) => {
      state.isOpen = true
    },
    setModalClose: (state) => initialState,
  },
})

export const { resetModal, setModalOpen, setModalClose } = modalSlice.actions
export default modalSlice.reducer
