import { connect } from 'react-redux'

import { SettingsIndex as SettingsIndexComponent } from './SettingsIndex'
import { getProfiles, profile } from '@common/profile'
import { currentUser } from '@common/currentUser'
import { navigateWithToken } from '@common/actions/navigateWithToken'
import { logoutUser } from './actions'

const mapStateToProps = state => ({
  user: profile.selectors.getUser(state),
  fcmToken: currentUser.selectors.getFCMToken(state)
})

export const SettingsIndex = connect(
  mapStateToProps,
  {
    navigateWithToken,
    getProfiles,
    logoutUser
  }
)(SettingsIndexComponent)
