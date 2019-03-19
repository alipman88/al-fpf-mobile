import { connect } from 'react-redux'

import { posts } from '../../posts'
import { issues } from '../../issues'

import { InThisIssue as InThisIssueComponent } from './InThisIssue'

const mapStateToProps = state => {
  const currentIssueId = issues.selectors.getCurrentIssueId(state)
  return {
    headlines: posts.selectors.getHeadlinesByIssue(state)[currentIssueId],
    posts: posts.selectors.getPostsByIssue(state)[currentIssueId]
  }
}

export const InThisIssue = connect(mapStateToProps)(InThisIssueComponent)
