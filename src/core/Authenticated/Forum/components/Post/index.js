import { connect } from 'react-redux'
import { appSettings } from '@common/appSettings'
import { Post as PostComponent } from './Post'

const mapStateToProps = state => ({
  postTruncateLength: appSettings.selectors.getPostTruncateLength(state)
})

export const Post = connect(mapStateToProps)(PostComponent)
