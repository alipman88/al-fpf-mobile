import { combineReducers } from 'redux'
import { currentUser } from '../currentUser'

export const securedReducer = combineReducers({
  currentUser: currentUser.reducer,
})
