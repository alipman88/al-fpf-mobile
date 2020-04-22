import { issues } from '@common/issues'
import { areas } from '@common/areas'
import { posts } from './slice'
import { getAuthorized } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { resetAction } from '@common/resetAction'
import { createResetStackTo } from '@common/utils/navigation'
import { responseError } from '@common/utils/responseError'
import endOfWeek from 'date-fns/end_of_week'
import endOfDay from 'date-fns/end_of_day'

export const getContents = (issueId, navigation) => async (
  dispatch,
  getState
) => {
  // short circuit if in default state with no issue
  if (issueId === 0) {
    return
  }

  const currentAreaId = areas.selectors.getCurrentAreaId(getState())
  const issue = issues.selectors
    .getIssuesForArea(getState(), currentAreaId)
    .find(issue => issue.id === issueId)

  if (!issue) {
    return
  }

  const postsByIssue = posts.selectors.getPostsByIssue(getState())

  if (postsByIssue[issue.id]) {
    const placementDateByIssue = posts.selectors.getPlacementDateByIssue(
      getState()
    )
    // If issue contents are cached but ad placement date is from a previous week,
    // fetch new ads before returning issue contents.
    if (
      placementDateByIssue[issue.id] &&
      endOfWeek(placementDateByIssue[issue.id]) < new Date()
    ) {
      getAds(issue, navigation)(dispatch, getState)
    }
    return
  }

  getAllContents(issue, navigation)(dispatch, getState)
}

const getAllContents = (issue, navigation) => async (dispatch, getState) => {
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
      ocm_message,
      forum_message
    } = response.data

    dispatch(
      posts.actions.setContentsForIssue({
        posts: postsData,
        sharedPosts,
        headlines,
        issueId: issue.id,
        ads,
        placementDate: endOfDay(new Date()),
        newsFromNeighboringNfs: news_from_neighboring_nfs,
        ocmMessage: ocm_message,
        forumMessage: forum_message
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

const getAds = (issue, navigation) => async (dispatch, getState) => {
  try {
    dispatch(posts.actions.setLoading(true))
    const response = await getAuthorized(
      `/areas/${issue.area_id}/issues/${issue.number}/ads`,
      getState()
    )

    const { ads: adsData } = response.data

    dispatch(
      posts.actions.setAdsForIssue({
        issueId: issue.id,
        ads: adsData,
        placementDate: endOfDay(new Date())
      })
    )
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(resetAction())
      navigation.navigate('SplashScreen')
      navigation.dispatch(createResetStackTo('Login'))
    }
  }
}
