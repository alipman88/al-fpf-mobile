import { connect } from 'react-redux'
import { currentUser } from '@fpf/common/currentUser'
import { profile } from '@fpf/common/profile'
import { Compose as ComposeScreen } from './Compose'
import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
  currentProfileId: profile.selectors.getCurrentProfileId(state),

  profiles: profile.selectors.getAvailableProfiles(state),
})

export const Compose = connect(mapStateToProps, {
  navigateWithToken,
})(ComposeScreen)
