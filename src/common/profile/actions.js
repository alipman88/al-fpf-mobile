import { profile } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getProfiles = () => async (dispatch, getState) => {
  try {
    const response = await getAuthorized('/users', getState())
    dispatch(profile.actions.setLoading(true))
    dispatch(profile.actions.setUserProfile(response.data.user))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(profile.actions.setLoading(false))
  }
}
