import { StackActions } from '@react-navigation/native'

import { rollbar } from '@fpf/common/utils/rollbar'
import { postAuthorized } from '@fpf/common/api'
import { resetAction } from '@fpf/common/resetAction'
import CookieManager from '@react-native-cookies/cookies'

export const logoutUser =
  (navigation, values, setLoading) => async (dispatch, getState) => {
    setLoading(true)
    try {
      await postAuthorized('/logout', values, getState())

      // WebView component requests cause cookies with session data to be stored.
      // Clear those cookies (which probably use WebKit, but clear both versions
      // just in case) to ensure that when a different user logs in, the WebView
      // authenticates as that new user.
      await CookieManager.clearAll()
      await CookieManager.clearAll(/* useWebKit */ true)

      rollbar.clearPerson()
    } catch (e) {
    } finally {
      dispatch(resetAction())
      setLoading(false)

      // using set timeout to ensure the code doesn't run until the Unauthenticated
      // (which has the "Login" screen) has become active; otherwise, react navigation
      // won't be able to find the Login screen
      setTimeout(() => navigation.dispatch(StackActions.replace('Login')))
    }
  }
