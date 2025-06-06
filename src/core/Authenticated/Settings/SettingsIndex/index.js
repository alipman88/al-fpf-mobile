import { connect } from 'react-redux'

import { SettingsIndex as SettingsIndexComponent } from './SettingsIndex'
import { getProfiles, profile } from '@fpf/common/profile'
import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'
import { logoutUser } from './actions'

const mapStateToProps = (state) => ({
  user: profile.selectors.getUser(state),
})

export const SettingsIndex = connect(mapStateToProps, {
  navigateWithToken,
  getProfiles,
  logoutUser,
})(SettingsIndexComponent)

export { logoutUser }
