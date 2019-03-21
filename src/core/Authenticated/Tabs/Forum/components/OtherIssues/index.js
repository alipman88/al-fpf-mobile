import { connect } from 'react-redux'
import { areas } from '@common/areas'
import { issues } from '@common/issues'
import { getPosts } from '@common/posts'
import { OtherIssues as OtherIssuesComponent } from './OtherIssues'

const mapStateToProps = state => {
  const areaId = areas.selectors.getCurrentAreaId(state)
  return {
    issues: issues.selectors.getLatestIssues(state, areaId),
    currentIssueId: issues.selectors.getCurrentIssueId(state),
    currentAreaId: areas.selectors.getCurrentAreaId(state)
  }
}

export const OtherIssues = connect(
  mapStateToProps,
  {
    setCurrentIssueId: issues.actions.setCurrentIssueId,
    toggleIssueUnread: issues.actions.toggleIssueUnread,
    getPosts
  }
)(OtherIssuesComponent)
