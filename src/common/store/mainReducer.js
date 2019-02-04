import { combineReducers } from 'redux'
import { appError } from '@components/AppError/slice'

export default combineReducers({
  appError: appError.reducer
})
