import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebarShow = !state.sidebarShow
    },
  },
})

export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
