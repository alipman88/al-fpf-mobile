import { connect } from 'react-redux'
import { BusinessInfo as BusinessInfoComponent } from './BusinessInfo'
import { newUser } from '../newUser'
import { appSettings, getAppSettings } from '@common/appSettings'

const mapStateToProps = state => {
  return {
    newUser: newUser.selectors.getNewUser(state),
    categories: appSettings.selectors.getBusinessCategories(state),
    loading: appSettings.selectors.getLoading(state)
  }
}

export const BusinessInfo = connect(
  mapStateToProps,
  {
    setNewUserByKey: newUser.actions.setNewUserByKey,
    getAppSettings
  }
)(BusinessInfoComponent)
