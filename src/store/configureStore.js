import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import users from './usersSlice'

const configureCustomStore = preloadedState => {
  const rootReducer = combineReducers({ users })

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState
  })

  return store
}

export default configureCustomStore