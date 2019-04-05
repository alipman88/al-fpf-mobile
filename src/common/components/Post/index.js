import { connect } from 'react-redux'

import { Post as PostComponent } from './Post'
import { fetchSpecificIssue } from '@common/issues'

export const Post = connect(
  null,
  {
    fetchSpecificIssue
  }
)(PostComponent)
