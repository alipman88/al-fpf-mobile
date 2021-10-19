import { rollbar } from '@common/utils/rollbar'
import { createResetStackTo } from '@common/utils/navigation'
import { postAuthorized } from '@common/api'
import { resetAction } from '@common/resetAction'
import CookieManager from '@react-native-cookies/cookies'

export const logoutUser = (navigation, values, setLoading) => async (
  dispatch,
  getState
) => {
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
    navigation.navigate('SplashScreen')
    navigation.dispatch(createResetStackTo('Login'))
  }
}
