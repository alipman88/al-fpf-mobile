import { combineReducers } from 'redux'
import { appMessage } from '@components/AppMessage/slice'
import { areas } from '@common/areas/slice'
import { issues } from '@common/issues/slice'
import { posts } from '@common/posts/slice'
import { products } from '@common/products/slice'
import { profile } from '@common/profile/slice'
import { purchases } from '@common/purchases/slice'
import { appSettings } from '@common/appSettings'
import { searchHistory } from '@core/Authenticated/Tabs/Search/SearchHistory/slice'
import { registrationEmail } from '@core/UnauthenticatedStack/SignUp/registrationEmail/slice'
import { newUser } from '@core/UnauthenticatedStack/SignUp/newUser/slice'
import { spinner } from '@app/Spinner/slice'
import { mailApp } from '@common/mailApp'

export const mainReducer = combineReducers({
  appMessage: appMessage.reducer,
  areas: areas.reducer,
  issues: issues.reducer,
  posts: posts.reducer,
  products: products.reducer,
  profile: profile.reducer,
  purchases: purchases.reducer,
  appSettings: appSettings.reducer,
  searchHistory: searchHistory.reducer,
  registrationEmail: registrationEmail.reducer,
  newUser: newUser.reducer,
  spinner: spinner.reducer,
  mailApp: mailApp.reducer
})
