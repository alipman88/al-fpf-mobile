import { profile } from './slice'
import * as api from '@fpf/common/api'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { responseError } from '@fpf/common/utils/responseError'

export const getProfiles = () => async (dispatch, getState) => {
  try {
    const response = await api.getAuthorized('/users', getState())
    dispatch(profile.actions.setLoading(true))
    dispatch(profile.actions.setUserProfile(response.data.user))
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  } finally {
    dispatch(profile.actions.setLoading(false))
  }
}

export const updateUser = (values) => async (dispatch, getState) => {
  try {
    dispatch(profile.actions.setLoading(true))
    for (let key of Object.keys(values)) {
      dispatch(profile.actions.setValueInUserData({ key, value: values[key] }))
    }

    const response = await api.putAuthorized(
      '/users',
      { user: values },
      getState(),
    )
    dispatch(profile.actions.setUserProfile(response.data.user))
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  } finally {
    dispatch(profile.actions.setLoading(false))
  }
}
