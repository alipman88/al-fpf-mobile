import { connect } from 'react-redux'

import { Post as PostComponent } from './Post'
import { fetchNeighboringIssue } from './actions'

export const Post = connect(
  null,
  {
    fetchNeighboringIssue
  }
)(PostComponent)
