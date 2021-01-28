import { areas as slice } from './slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { resetAction } from '@common/resetAction'
import { createResetStackTo } from '@common/utils/navigation'
import { responseError } from '@common/utils/responseError'

export const getAreas = (navigation) => async (dispatch, getState) => {
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
    if (e.response.status === 401) {
      dispatch(resetAction())
      navigation.navigate('SplashScreen')
      navigation.dispatch(createResetStackTo('Login'))
    }
  }
}

export const resetAreas = (navigation) => async (dispatch, getState) => {
  dispatch(slice.actions.resetAreas())
}
