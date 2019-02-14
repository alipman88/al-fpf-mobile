import { areas } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getAreas = () => async (dispatch, getState) => {
  try {
    const response = await getAuthorized('/areas', getState())
    dispatch(areas.actions.setAreas(response.data.areas))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
