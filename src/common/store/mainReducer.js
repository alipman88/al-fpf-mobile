import { combineReducers } from 'redux'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { areas } from '@fpf/common/areas/slice'
import { products } from '@fpf/common/products/slice'
import { profile } from '@fpf/common/profile/slice'
import { purchases } from '@fpf/common/purchases/slice'
import { appSettings } from '@fpf/common/appSettings'
import { registrationEmail } from '@fpf/core/UnauthenticatedStack/SignUp/registrationEmail/slice'
import { newUser } from '@fpf/core/UnauthenticatedStack/SignUp/newUser/slice'
import { spinner } from '@fpf/app/Spinner/slice'
import { mailApp } from '@fpf/common/mailApp'

export const mainReducer = combineReducers({
  appMessage: appMessage.reducer,
  areas: areas.reducer,
  products: products.reducer,
  profile: profile.reducer,
  purchases: purchases.reducer,
  appSettings: appSettings.reducer,
  registrationEmail: registrationEmail.reducer,
  newUser: newUser.reducer,
  spinner: spinner.reducer,
  mailApp: mailApp.reducer,
})
