import { connect } from 'react-redux'

import { MapScreen as MapScreenComponent } from './MapScreen'
import { newUser } from '../newUser'

export const MapScreen = connect(
  null,
  { setNewUserByKey: newUser.actions.setNewUserByKey }
)(MapScreenComponent)
