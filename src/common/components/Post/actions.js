import { areas } from '@common/areas'
import { issues, getIssue } from '@common/issues'

export const fetchNeighboringIssue = post => async (dispatch, getState) => {
  dispatch(areas.actions.setCurrentAreaId(post.area_id))
  await getIssue(post.area_id, post.issue_number)(dispatch, getState)
  dispatch(issues.actions.setCurrentIssueId(post.issue_id))
}
