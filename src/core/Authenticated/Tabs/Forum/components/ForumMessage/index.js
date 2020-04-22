import { connect } from 'react-redux'

import { ForumMessage as ForumMessageComponent } from './ForumMessage'
import { posts } from '@common/posts'
import { issues } from '@common/issues'

const mapStateToProps = state => {
  const currentIssueId = issues.selectors.getCurrentIssueId(state)
  return {
    forumMessage: posts.selectors.getForumMessageByIssue(state)[currentIssueId]
  }
}

export const ForumMessage = connect(mapStateToProps)(ForumMessageComponent)
