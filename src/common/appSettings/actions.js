import { appSettings } from './slice'
import { api } from '@fpf/common/api'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { responseError } from '@fpf/common/utils/responseError'

export const getAppSettings = () => async (dispatch, getState) => {
  try {
    dispatch(appSettings.actions.setLoading(true))
    const response = await api.get('/settings')
    dispatch(appMessage.actions.hideNetworkError())
    dispatch(appSettings.actions.setAppSettings(response.data))
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
    throw e
  } finally {
    dispatch(appSettings.actions.setLoading(false))
  }
}
