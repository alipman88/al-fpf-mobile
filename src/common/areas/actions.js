import { areas as slice } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getAreas = () => async (dispatch, getState) => {
  try {
    let page = 0
    let areas = []
    let pages = 0
    do {
      page++
      const response = await getAuthorized(`/areas?page=${page}`, getState())
      pages = response.data.pagination.pages
      areas = areas.concat(response.data.areas)
    } while (page < pages)
    dispatch(slice.actions.setAreas(areas))
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
