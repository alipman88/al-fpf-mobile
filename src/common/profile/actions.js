import { profile } from './slice'
import * as api from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getProfiles = () => async (dispatch, getState) => {
  try {
    const response = await api.getAuthorized('/users', getState())
    dispatch(profile.actions.setLoading(true))
    dispatch(profile.actions.setUserProfile(response.data.user))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(profile.actions.setLoading(false))
  }
}

export const updateUser = values => async (dispatch, getState) => {
  try {
    for (let key of Object.keys(values)) {
      dispatch(profile.actions.setValueInUserData({ key, value: values[key] }))
    }

    const response = await api.putAuthorized(
      '/users',
      { user: values },
      getState()
    )
    dispatch(profile.actions.setLoading(true))
    dispatch(profile.actions.setUserProfile(response.data.user))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(profile.actions.setLoading(false))
  }
}
