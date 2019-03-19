import { connect } from 'react-redux'

import { resetAction } from '@common/resetAction'
import { SettingsIndex as SettingsIndexComponent } from './SettingsIndex'

export const SettingsIndex = connect(
  null,
  {
    resetAction
  }
)(SettingsIndexComponent)
