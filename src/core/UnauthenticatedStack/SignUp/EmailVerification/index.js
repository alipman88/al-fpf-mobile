import { connect } from 'react-redux'

import { EmailVerification as EmailVerificationComponent } from './EmailVerification'
import { registrationEmail } from '../registrationEmail'
import { resendEmail } from './actions'

const mapStateToProps = state => ({
  email: registrationEmail.selectors.getRegistrationEmail(state)
})

export const EmailVerification = connect(
  mapStateToProps,
  {
    resendEmail
  }
)(EmailVerificationComponent)
