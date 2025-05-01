import { connect } from 'react-redux'
import { currentUser } from '@fpf/common/currentUser'
import { Forum as ForumScreen } from './Forum'

import { sendNewFCMToken } from './actions'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
  fcmToken: currentUser.selectors.getFCMToken(state),
})

export const Forum = connect(mapStateToProps, { sendNewFCMToken })(ForumScreen)
