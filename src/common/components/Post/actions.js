import { areas } from '@common/areas'
import { issues, getIssue } from '@common/issues'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'
import { spinner } from '@app/Spinner/slice'

export const fetchNeighboringIssue = (post, navigation) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(spinner.actions.setVisibility(true))
    dispatch(areas.actions.setCurrentAreaId(post.area_id))
    await getIssue(post.area_id, post.issue_number)(dispatch, getState)
    dispatch(issues.actions.setCurrentIssueId(post.issue_id))
    navigation.navigate('Forum')
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  } finally {
    dispatch(spinner.actions.setVisibility(false))
  }
}
