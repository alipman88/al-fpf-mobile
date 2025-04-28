import { connect } from 'react-redux'
import { currentUser } from '@fpf/common/currentUser'
import { Forum as ForumScreen } from './Forum'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Forum = connect(mapStateToProps)(ForumScreen)
