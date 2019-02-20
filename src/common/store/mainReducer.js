import { combineReducers } from 'redux'
import { appError } from '@components/AppError/slice'
import { areas } from '@common/areas/slice'
import { profile } from '@common/profile/slice'

export default combineReducers({
  appError: appError.reducer,
  areas: areas.reducer,
  profile: profile.reducer
})
