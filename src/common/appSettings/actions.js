import { appSettings } from './slice'
import { api } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { responseError } from '@common/utils/responseError'

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
