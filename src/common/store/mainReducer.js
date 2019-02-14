import { combineReducers } from 'redux'
import { appError } from '@components/AppError/slice'
import { areas } from '@common/areas/slice'

export default combineReducers({
  appError: appError.reducer,
  areas: areas.reducer
})
