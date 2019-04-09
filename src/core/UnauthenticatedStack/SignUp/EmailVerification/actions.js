import { api } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { responseError } from '@common/utils/responseError'

export const resendEmail = email => async dispatch => {
  try {
    await api.post('/resend_email_verification', { email })
    dispatch(
      appMessage.actions.setAppMessage({
        message: 'Verification resent',
        type: 'success'
      })
    )
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
