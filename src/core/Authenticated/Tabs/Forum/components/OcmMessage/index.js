import { connect } from 'react-redux'

import { OcmMessage as OcmMessageComponent } from './OcmMessage'
import { posts } from '@common/posts'
import { issues } from '@common/issues'

const mapStateToProps = state => {
  const currentIssueId = issues.selectors.getCurrentIssueId(state)
  return {
    ocmMessage: posts.selectors.getOcmMessageByIssue(state)[currentIssueId]
  }
}

export const OcmMessage = connect(mapStateToProps)(OcmMessageComponent)
