import { connect } from 'react-redux'
import { newUser } from '../newUser'
import { appSettings } from '@common/appSettings'
import { GovernmentInfo as GovernmentInfoComponent } from './GovernmentInfo'

const mapStateToProps = (state) => {
  return {
    newUser: newUser.selectors.getNewUser(state),
    governmentTitles: appSettings.selectors.getGovernmentTitles(state),
  }
}

export const GovernmentInfo = connect(mapStateToProps, {
  setNewUserByKey: newUser.actions.setNewUserByKey,
})(GovernmentInfoComponent)
