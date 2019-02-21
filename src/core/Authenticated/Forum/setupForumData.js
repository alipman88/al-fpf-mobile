import { getAreas } from '@common/areas'
import { getIssues } from './issues'
import { getPosts } from './posts'

export const setupForumData = () => async (dispatch, getState) => {
  await getAreas()
  await getIssues(getState().main.areas.currentAreaId)
  await getPosts(getState().main.issues.currentIssueNum)
}
