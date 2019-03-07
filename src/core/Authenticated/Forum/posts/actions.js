import { issues } from '../issues/slice'
import { areas } from '@common/areas'
import { posts } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getPosts = issueId => async (dispatch, getState) => {
  const currentAreaId = areas.selectors.getCurrentAreaId(getState())
  const issue = issues.selectors
    .getIssuesForArea(getState(), currentAreaId)
    .find(issue => issue.id === issueId)

  if (!issue) {
    console.error(`Could not find an issue by id ${issueId}`)
    return
  }

  const postsByIssue = posts.selectors.getPostsByIssue(getState())

  if (postsByIssue[issue.id]) {
    return
  }

  try {
    const response = await getAuthorized(
      `/areas/${issue.area_id}/issues/${issue.number}/contents`,
      getState()
    )

    const {
      posts: postsData,
      headlines,
      ads,
      news_from_neighboring_nfs
    } = response.data

    dispatch(
      posts.actions.setPostsForIssue({
        posts: postsData,
        headlines,
        issueId: issue.id,
        ads,
        newsFromNeighboringNfs: news_from_neighboring_nfs
      })
    )
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
