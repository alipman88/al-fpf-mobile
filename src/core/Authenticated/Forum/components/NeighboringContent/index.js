import { connect } from 'react-redux'

import { NeighboringContent as NeighboringContentComponent } from './NeighboringContent'
import { posts } from '../../posts'
import { issues } from '../../issues'
import { fetchNeighboringIssue } from './actions'

const mapStateToProps = state => {
  const currentIssueId = issues.selectors.getCurrentIssueId(state)
  return {
    newsFromNeighboringNfs: posts.selectors.getNewsFromNeighboringNfsByIssue(
      state
    )[currentIssueId]
  }
}

export const NeighboringContent = connect(
  mapStateToProps,
  {
    fetchNeighboringIssue
  }
)(NeighboringContentComponent)
