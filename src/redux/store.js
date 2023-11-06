import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebar/sidebarReducer'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
})

const configStore = configureStore({
  reducer: rootReducer,
})

const store = configStore

export default store

// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
