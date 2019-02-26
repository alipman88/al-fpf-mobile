import { appSettings } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getAppSettings = () => async (dispatch, getState) => {
  try {
    const response = await getAuthorized('/settings', getState())
    dispatch(appSettings.actions.setLoading(true))
    dispatch(appSettings.actions.setAppSettings(response.data))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(appSettings.actions.setLoading(false))
  }
}
