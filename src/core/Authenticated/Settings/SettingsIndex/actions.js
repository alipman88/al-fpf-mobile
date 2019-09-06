import { rollbar } from '@common/utils/rollbar'
import { createResetStackTo } from '@common/utils/navigation'
import { postAuthorized } from '@common/api'
import { resetAction } from '@common/resetAction'

export const logoutUser = (navigation, values, setLoading) => async (
  dispatch,
  getState
) => {
  setLoading(true)
  try {
    await postAuthorized('/logout', values, getState())
    rollbar.clearPerson()
  } catch (e) {
  } finally {
    dispatch(resetAction())
    navigation.navigate('SplashScreen')
    navigation.dispatch(createResetStackTo('Login'))
    setLoading(false)
  }
}
