import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { createStackNavForTab } from '@core/Authenticated/createStackNavForTab'
import { currentUser } from '@common/currentUser'
import { areas } from '@common/areas'
import { getIssues, issues } from '@common/issues'
import { getPosts, posts } from '@common/posts'
import { setupForumData } from '../../setupForumData.js'

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
    ads: posts.selectors.getAdsByIssue(state)
  }
}

export const Forum = createStackNavForTab({
  Forum: connect(
    mapStateToProps,
    {
      getIssues,
      getPosts,
      setAccessToken: currentUser.actions.setAccessToken,
      setupForumData,
      setCurrentIssueId: issues.actions.setCurrentIssueId,
      setCurrentAreaId: areas.actions.setCurrentAreaId
    }
  )(ForumComponent)
})
