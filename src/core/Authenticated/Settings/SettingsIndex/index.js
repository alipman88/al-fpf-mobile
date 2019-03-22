import { connect } from 'react-redux'

import { resetAction } from '@common/resetAction'
import { SettingsIndex as SettingsIndexComponent } from './SettingsIndex'
import { profile } from '@common/profile'
import { navigateWithToken } from '@common/actions/navigateWithToken'

const mapStateToProps = state => ({
  user: profile.selectors.getUser(state)
})

export const SettingsIndex = connect(
  mapStateToProps,
  {
    navigateWithToken,
    resetAction
  }
)(SettingsIndexComponent)
