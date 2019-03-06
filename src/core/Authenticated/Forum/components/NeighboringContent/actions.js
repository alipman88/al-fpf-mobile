import { getPosts } from '../../posts'
import { issues, getIssues } from '../../issues'
import { areas } from '@common/areas'

export const fetchNeighboringIssue = news => async (dispatch, getState) => {
  dispatch(areas.actions.setCurrentAreaId(news.area_id))
  await dispatch(getIssues(news.area_id))
  const issuesInState = issues.selectors.getIssuesForArea(
    getState(),
    news.area_id
  )
  const currentIssue = issuesInState.find(
    issue => issue.number === news.issue_number
  )
  dispatch(issues.actions.setCurrentIssueId(currentIssue.id))

  await dispatch(getPosts(currentIssue.id))
}
