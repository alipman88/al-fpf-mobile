import { connect } from 'react-redux'
import { appSettings } from '@common/appSettings'
import { currentUser } from '@common/currentUser'
import { setupForumData } from '../../setupForumData.js'
import { Post as PostComponent } from './Post'

const mapStateToProps = state => ({
  postTruncateLength: appSettings.selectors.getPostTruncateLength(state)
})

export const Post = connect(mapStateToProps)(PostComponent)
