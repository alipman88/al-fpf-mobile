import { connect } from 'react-redux'

import { GovernmentInfo as GovernmentInfoComponent } from './GovernmentInfo'
import { newUser } from '../newUser'

export const GovernmentInfo = connect(
  null,
  { setNewUserByKey: newUser.actions.setNewUserByKey }
)(GovernmentInfoComponent)
