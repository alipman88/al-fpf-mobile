import { connect } from 'react-redux'
import { appSettings } from '@common/appSettings'
import { ForumPost as ForumPostComponent } from './ForumPost'

const mapStateToProps = state => ({
  postTruncateLength: appSettings.selectors.getForumPostTruncateLength(state)
})

export const ForumPost = connect(mapStateToProps)(ForumPostComponent)
