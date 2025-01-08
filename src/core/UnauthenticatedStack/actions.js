import { api } from '@fpf/common/api'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { responseError } from '@fpf/common/utils/responseError'

export const resendEmail = (email) => async (dispatch) => {
  try {
    await api.post('/resend_email_verification', { email })
    dispatch(
      appMessage.actions.setAppMessage({
        message: 'Verification resent',
        type: 'success',
        autoHide: true,
      }),
    )
  } catch (e) {
    dispatch(appMessage.actions.setAppError(responseError(e)))
  }
}
