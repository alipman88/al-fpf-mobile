import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'
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
    dispatch(resetAction())
    navigation.navigate('SplashScreen')
    navigation.dispatch(createResetStackTo('Login'))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    setLoading(false)
  }
}
