import { StackActions } from '@react-navigation/native'

import { rollbar } from '@fpf/common/utils/rollbar'
import { postAuthorized } from '@fpf/common/api'
import { resetAction } from '@fpf/common/resetAction'
import CookieManager from '@react-native-cookies/cookies'

/**
 * Logs the user out of the app:
 * - Calls the logout API method
 * - Clears authentication data from the WebView (i.e. cookies)
 * - Dispatches the RESET action, which each redux slice should listen to in order
 *   to clear stored data
 * - Clears the Rollbar person
 * - Updates the navigation stack to show the login page
 */
export const logoutUser = (navigation) => async (dispatch, getState) => {
  // Protect each step of logout. If one errors, we still want the other steps
  // to be attempted.

  try {
    await postAuthorized('/logout', {}, getState())
  } catch (e) {
    rollbar.error('Logout: /logout API call failed', e)
  }

  try {
    // WebView component requests cause cookies with session data to be stored.
    // Clear those cookies (which probably use WebKit, but clear both versions
    // just in case) to ensure that when a different user logs in, the WebView
    // authenticates as that new user.
    await CookieManager.clearAll()
    await CookieManager.clearAll(/* useWebKit */ true)
  } catch (e) {
    rollbar.error('Logout: cookie clear failed', e)
  }

  try {
    dispatch(resetAction())
  } catch (e) {
    rollbar.error('Logout: reset redux state failed', e)
  }

  try {
    rollbar.clearPerson()
  } catch {}

  // using set timeout to ensure the code doesn't run until the Unauthenticated
  // stack (which has the "Login" screen) has become active; otherwise, react
  // navigation won't be able to find the Login screen
  setTimeout(() => navigation.dispatch(StackActions.replace('Login')))
}
