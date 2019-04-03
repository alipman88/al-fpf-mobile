import { connect } from 'react-redux'
import { ProfileTypes as ProfileTypesComponent } from './ProfileTypes'
import { newUser } from '../newUser'
import { appSettings, getAppSettings } from '@common/appSettings'

const mapStateToProps = state => {
  return {
    newUser: newUser.selectors.getNewUser(state),
    profileType: newUser.selectors.getProfileType(state),
    profilePlans: appSettings.selectors.getProfilePlans(state)
  }
}

export const ProfileTypes = connect(
  mapStateToProps,
  {
    setNewUserByKey: newUser.actions.setNewUserByKey,
    getAppSettings
  }
)(ProfileTypesComponent)
