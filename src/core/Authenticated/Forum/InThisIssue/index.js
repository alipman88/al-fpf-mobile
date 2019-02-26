import { connect } from 'react-redux'

import { posts } from '../posts'
import { issues } from '../issues'

import { InThisIssue as InThisIssueComponent } from './InThisIssue'

const mapStateToProps = state => {
  const currentIssueNum = issues.selectors.getCurrentIssueNumber(state)
  return {
    headlines: posts.selectors.getHeadlinesByIssue(state)[currentIssueNum]
  }
}

export const InThisIssue = connect(mapStateToProps)(InThisIssueComponent)
