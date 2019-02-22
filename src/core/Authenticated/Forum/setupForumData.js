import { getAreas, areas } from '@common/areas'
import { getIssues, issues } from './issues'
import { getPosts } from './posts'

export const setupForumData = () => async (dispatch, getState) => {
  await dispatch(getAreas())
  await dispatch(getIssues(areas.selectors.getCurrentAreaId(getState())))
  await dispatch(getPosts(issues.selectors.getCurrentIssueNumber(getState())))
}
