import { connect } from 'react-redux'
import { BasicInfo as BasicInfoComponent } from './BasicInfo'
import { newUser } from '../newUser'

const mapStateToProps = state => {
  return {
    newUser: newUser.selectors.getNewUser(state),
    profileType: newUser.selectors.getProfileType(state)
  }
}

export const BasicInfo = connect(
  mapStateToProps,
  {
    setNewUserByKey: newUser.actions.setNewUserByKey
  }
)(BasicInfoComponent)
