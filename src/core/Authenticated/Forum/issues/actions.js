import { issues } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getIssues = areaId => async (dispatch, getState) => {
  try {
    const response = await getAuthorized(`/areas/${areaId}/issues`, getState())

    if (
      issues.selectors.getFirstLoadIssues(getState()) &&
      Object.keys(issues.selectors.getIssues(getState())).length
    ) {
      dispatch(issues.actions.setFirstLoadFalse())
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
