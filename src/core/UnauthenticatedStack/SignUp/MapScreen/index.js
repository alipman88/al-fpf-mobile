import { connect } from 'react-redux'

import { MapScreen as MapScreenComponent } from './MapScreen'
import { newUser } from '../newUser'

const mapStateToProps = (state) => ({
  newUser: newUser.selectors.getNewUser(state),
  profileType: newUser.selectors.getProfileType(state),
})

export const MapScreen = connect(mapStateToProps, {
  setNewUserByKey: newUser.actions.setNewUserByKey,
})(MapScreenComponent)
