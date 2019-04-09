import { areas as slice } from './slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { responseError } from '@common/utils/responseError'

export const getAreas = () => async (dispatch, getState) => {
  try {
    let page = 0
    let areas = []
    let pages = 0
    do {
      page++
      dispatch(slice.actions.setLoading(true))
      const response = await getAuthorized(`/areas?page=${page}`, getState())
      pages = response.data.pagination.pages
      areas = areas.concat(response.data.areas)
    } while (page < pages)
    dispatch(slice.actions.setAreas(areas))
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
