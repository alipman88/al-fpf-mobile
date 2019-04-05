import { connect } from 'react-redux'

import { NeighboringContent as NeighboringContentComponent } from './NeighboringContent'
import { posts } from '@common/posts'
import { issues } from '@common/issues'
import { areas } from '@common/areas'

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
    setCurrentAreaId: areas.actions.setCurrentAreaId
  }
)(NeighboringContentComponent)
