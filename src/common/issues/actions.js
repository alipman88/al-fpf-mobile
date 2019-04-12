import { issues } from './slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { responseError } from '@common/utils/responseError'
import { areas } from '@common/areas'
import { spinner } from '@app/Spinner/slice'

export const getIssues = areaId => async (dispatch, getState) => {
  try {
    dispatch(issues.actions.setLoading(true))
    const response = await getAuthorized(
      `/areas/${areaId}/issues?page=1&count=30`,
      getState()
    )

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
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}

// Async exceptions not caught here, so caller can handle instead
export const getIssue = (areaId, issueNumber) => async (dispatch, getState) => {
  dispatch(issues.actions.setLoading(true))
  const response = await getAuthorized(
    `/areas/${areaId}/issues/${issueNumber}`,
    getState()
  )

  if (
    issues.selectors.getFirstLoadIssues(getState()) &&
    Object.keys(issues.selectors.getIssues(getState())).length
  ) {
    dispatch(issues.actions.setFirstLoadOfIssues(false))
  }

  dispatch(
    issues.actions.setIssue({
      issue: response.data.issue,
      areaId
    })
  )
}

export const fetchSpecificIssue = (
  areaId,
  issueId,
  issueNumber,
  navigation
) => async (dispatch, getState) => {
  try {
    dispatch(spinner.actions.setVisibility(true))
    dispatch(areas.actions.setCurrentAreaId(areaId))
    await getIssue(areaId, issueNumber)(dispatch, getState)
    dispatch(issues.actions.setCurrentIssueId(issueId))
    navigation.navigate('Forum')
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  } finally {
    dispatch(spinner.actions.setVisibility(false))
  }
}
