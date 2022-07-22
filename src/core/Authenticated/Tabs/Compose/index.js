import { connect } from 'react-redux'
import { currentUser } from '@common/currentUser'
import { profile } from '@common/profile'
import { Compose as ComposeScreen } from './Compose'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
  currentProfileId: profile.selectors.getCurrentProfileId(state),
  profiles: profile.selectors.getAvailableProfiles(state),
})

export const Compose = connect(mapStateToProps)(ComposeScreen)
