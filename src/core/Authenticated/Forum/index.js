import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { createStackNavForTab } from '../createStackNavForTab'
import { currentUser } from '@common/currentUser'
import { areas, getAreas } from '@common/areas'
import { issues, getIssues } from './issues'
import { posts, getPosts } from './posts'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state),
  currentAreaId: areas.selectors.getCurrentAreaId(state),
  issues: issues.selectors.getIssues(state),
  currentIssueNum: issues.selectors.getCurrentIssueNumber(state),
  posts: posts.selectors.getPostsByIssue(state)
})

export const Forum = createStackNavForTab({
  Forum: connect(
    mapStateToProps,
    {
      setAccessToken: currentUser.actions.setAccessToken,
      getAreas,
      getIssues,
      getPosts
    }
  )(ForumComponent)
})
