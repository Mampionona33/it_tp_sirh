import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action) => {
      const notificationIdToRemove = action.payload
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== notificationIdToRemove,
      )
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
