import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { currentUser } from '@common/currentUser'

export const Forum = connect(
  null,
  { setAccessToken: currentUser.actions.setAccessToken }
)(ForumComponent)
