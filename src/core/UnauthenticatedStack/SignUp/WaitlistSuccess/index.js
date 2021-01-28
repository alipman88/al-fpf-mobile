import { connect } from 'react-redux'

import { WaitlistSuccess as WaitlistSuccessComponent } from './WaitlistSuccess'
import { newUser } from '../newUser'

export const WaitlistSuccess = connect(null, {
  clearUserData: newUser.actions.clearData,
})(WaitlistSuccessComponent)
