import { connect } from 'react-redux'
import { areas } from '@common/areas'
import { issues } from '../../issues'
import { getPosts } from '../../posts'
import { OtherIssues as OtherIssuesComponent } from './OtherIssues'

const mapStateToProps = state => {
  const areaId = areas.selectors.getCurrentAreaId(state)
  return {
    issues: issues.selectors.getLatestIssues(state, areaId),
    currentIssueId: issues.selectors.getCurrentIssueId(state)
  }
}

export const OtherIssues = connect(
  mapStateToProps,
  {
    setCurrentIssueId: issues.actions.setCurrentIssueId,
    getPosts
  }
)(OtherIssuesComponent)
