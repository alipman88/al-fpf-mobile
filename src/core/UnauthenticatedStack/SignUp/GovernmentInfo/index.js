import { connect } from 'react-redux'
import { newUser } from '../newUser'
import { GovernmentInfo as GovernmentInfoComponent } from './GovernmentInfo'

const mapStateToProps = state => {
  return {
    newUser: newUser.selectors.getNewUser(state)
  }
}

export const GovernmentInfo = connect(
  mapStateToProps,
  { setNewUserByKey: newUser.actions.setNewUserByKey }
)(GovernmentInfoComponent)
