import { connect } from 'react-redux'

import { NeighboringContent as NeighboringContentComponent } from './NeighboringContent'
import { posts } from '@common/posts'
import { fetchSpecificIssue, issues } from '@common/issues'

const mapStateToProps = (state) => {
  const currentIssueId = issues.selectors.getCurrentIssueId(state)
  return {
    newsFromNeighboringNfs:
      posts.selectors.getNewsFromNeighboringNfsByIssue(state)[currentIssueId],
  }
}

export const NeighboringContent = connect(mapStateToProps, {
  fetchSpecificIssue,
})(NeighboringContentComponent)
