import { issues } from '../issues/slice'
import { posts } from './slice'
import { getAuthorized } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const getPosts = issueNumber => async (dispatch, getState) => {
  const issue = issues.selectors
    .getIssues(getState())
    .find(issue => issue.number === issueNumber)

  if (!issue) {
    console.error(`Could not find an issue by number ${issueNumber}`)
    return
  }

  try {
    const response = await getAuthorized(
      `/areas/${issue.area_id}/issues/${issue.number}/contents`,
      getState()
    )

    const { posts: postsData, headlines } = response.data

    dispatch(
      posts.actions.setPostsForIssue({
        posts: postsData,
        headlines,
        issueNumber: issue.number
      })
    )
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
