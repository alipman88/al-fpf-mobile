import { issues } from '@common/issues'
import { areas } from '@common/areas'
import { posts } from './slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { resetAction } from '@common/resetAction'
import { createResetStackTo } from '@common/utils/navigation'
import { responseError } from '@common/utils/responseError'

export const getPosts = (issueId, navigation) => async (dispatch, getState) => {
  // short circuit if in default state with no issue
  if (issueId === 0) {
    return
  }

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
    dispatch(posts.actions.setLoading(true))
    const response = await getAuthorized(
      `/areas/${issue.area_id}/issues/${issue.number}/contents`,
      getState()
    )

    const {
      posts: postsData,
      shared_posts: sharedPosts,
      headlines,
      ads,
      news_from_neighboring_nfs,
      ocm_message
    } = response.data

    dispatch(
      posts.actions.setPostsForIssue({
        posts: postsData,
        sharedPosts,
        headlines,
        issueId: issue.id,
        ads,
        newsFromNeighboringNfs: news_from_neighboring_nfs,
        ocmMessage: ocm_message
      })
    )
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
    if (e.response.status === 401) {
      dispatch(resetAction())
      navigation.navigate('SplashScreen')
      navigation.dispatch(createResetStackTo('Login'))
    }
  }
}
