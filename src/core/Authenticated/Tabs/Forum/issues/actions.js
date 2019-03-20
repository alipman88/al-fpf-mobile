import { issues } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getIssues = areaId => async (dispatch, getState) => {
  try {
    dispatch(issues.actions.setLoading(true))
    const response = await getAuthorized(`/areas/${areaId}/issues`, getState())

    if (!issues.selectors.getFirstLoadIssues(getState())) {
      dispatch(issues.actions.setFirstLoadOfIssues())
    }

    dispatch(
      issues.actions.setIssues({
        issues: response.data.issues,
        areaId
      })
    )
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
