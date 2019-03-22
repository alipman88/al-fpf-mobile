import { connect } from 'react-redux'
import { ProfileTypes as ProfileTypesComponent } from './ProfileTypes'
import { newUser } from '../newUser'

const mapStateToProps = state => {
  return {
    user: newUser.selectors.getNewUser(state)
  }
}

export const ProfileTypes = connect(
  mapStateToProps,
  {
    setNewUserByKey: newUser.actions.setNewUserByKey
  }
)(ProfileTypesComponent)
