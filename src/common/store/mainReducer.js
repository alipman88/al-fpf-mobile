import { combineReducers } from 'redux'
import { appError } from '@components/AppError/slice'
import { areas } from '@common/areas/slice'
import { issues } from '@core/Authenticated/Forum/issues/slice'
import { posts } from '@core/Authenticated/Forum/posts/slice'
import { profile } from '@common/profile/slice'
import { appSettings } from '@common/appSettings'
import { searchHistory } from '@core/Authenticated/Search/SearchHistory/slice'

export default combineReducers({
  appError: appError.reducer,
  areas: areas.reducer,
  issues: issues.reducer,
  posts: posts.reducer,
  profile: profile.reducer,
  appSettings: appSettings.reducer,
  searchHistory: searchHistory.reducer
})
