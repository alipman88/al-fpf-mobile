import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { currentUser } from '@common/currentUser'
import { areas } from '@common/areas'
import { getIssues, issues, fetchSpecificIssue } from '@common/issues'
import { getPosts, posts } from '@common/posts'
import { setupForumData } from './setupForumData.js'
import { appError } from '@components/AppError/slice'

import { sendNewFCMToken } from './actions'

const mapStateToProps = state => {
  const areaId = areas.selectors.getCurrentAreaId(state)
  return {
    areas: areas.selectors.getAreas(state),
    neighboringAreas: areas.selectors.getNeighboringAreas(state),
    currentAreaId: areas.selectors.getCurrentAreaId(state),
    currentIssueId: issues.selectors.getCurrentIssueId(state),
    issues: issues.selectors.getLatestIssues(state, areaId),
    posts: posts.selectors.getPostsByIssue(state),
    shared_posts: posts.selectors.getSharedPostsByIssue(state),
    ads: posts.selectors.getAdsByIssue(state),
    accessToken: currentUser.selectors.getAccessToken(state),
    fcmToken: currentUser.selectors.getFCMToken(state),
    loading:
      areas.selectors.getLoading(state) ||
      issues.selectors.getLoading(state) ||
      posts.selectors.getLoading(state)
  }
}

export const Forum = connect(
  mapStateToProps,
  {
    fetchSpecificIssue,
    getIssues,
    getPosts,
    setAccessToken: currentUser.actions.setAccessToken,
    setAppError: appError.actions.setAppError,
    setupForumData,
    sendNewFCMToken,
    setCurrentIssueId: issues.actions.setCurrentIssueId,
    setCurrentAreaId: areas.actions.setCurrentAreaId
  }
)(ForumComponent)
