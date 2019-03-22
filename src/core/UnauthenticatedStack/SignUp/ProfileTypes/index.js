import { connect } from 'react-redux'
import { ProfileTypes as ProfileTypesComponent } from './ProfileTypes'
import { newUser } from '../newUser'

export const ProfileTypes = connect(
  undefined,
  {
    setNewUserByKey: newUser.actions.setNewUserByKey
  }
)(ProfileTypesComponent)
