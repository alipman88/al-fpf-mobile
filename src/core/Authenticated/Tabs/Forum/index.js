import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { currentUser } from '@fpf/common/currentUser'
import { areas } from '@fpf/common/areas'
import { getIssues, issues, fetchSpecificIssue } from '@fpf/common/issues'
import { getContents, posts } from '@fpf/common/posts'
import { setupForumData } from './setupForumData.js'
import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'

import { sendNewFCMToken } from './actions'

const mapStateToProps = (state) => {
  const areaId = areas.selectors.getCurrentAreaId(state)
  return {
    areas: areas.selectors.getAreas(state),
    neighboringAreas: areas.selectors.getNeighboringAreas(state),
    currentAreaId: areas.selectors.getCurrentAreaId(state),
    currentIssueId: issues.selectors.getCurrentIssueId(state),
    hasAreaAccess: areas.selectors.getHasAreaAccess(state),
    issues: issues.selectors.getIssuesForArea(state, areaId),
    posts: posts.selectors.getPostsByIssue(state),
    ads: posts.selectors.getAdsByIssue(state),
    featuredAdCampaigns: posts.selectors.getFeaturedAdCampaignsByIssue(state),
    sharedPosts: posts.selectors.getSharedPostsByIssue(state),
    fcmToken: currentUser.selectors.getFCMToken(state),
    loading:
      areas.selectors.getLoading(state) ||
      issues.selectors.getLoading(state) ||
      posts.selectors.getLoading(state),
  }
}

export const Forum = connect(mapStateToProps, {
  fetchSpecificIssue,
  getIssues,
  getContents,
  setupForumData,
  sendNewFCMToken,
  setCurrentIssueId: issues.actions.setCurrentIssueId,
  setCurrentAreaId: areas.actions.setCurrentAreaId,
  navigateWithToken,
  toggleIssueUnread: issues.actions.toggleIssueUnread,
})(ForumComponent)
