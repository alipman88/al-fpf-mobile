import { connect } from 'react-redux'

import { EmailVerification as EmailVerificationComponent } from './EmailVerification'
import { registrationEmail } from '../registrationEmail'
import { resendEmail } from './actions'
import { newUser } from '../newUser'

const mapStateToProps = state => ({
  email: registrationEmail.selectors.getRegistrationEmail(state),
  newUser: newUser.selectors.getNewUser(state),
  profileType: newUser.selectors.getProfileType(state)
})

export const EmailVerification = connect(
  mapStateToProps,
  {
    resendEmail,
    setRegistrationEmail: registrationEmail.actions.setRegistrationEmail,
    clearUserData: newUser.actions.clearData
  }
)(EmailVerificationComponent)
