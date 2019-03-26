import { api } from '@common/api'
import { appError } from '@components/AppError/slice'
import { responseError } from '@common/utils/responseError'

export const resendEmail = email => async dispatch => {
  try {
    await api.post('/resend_email_verification', email)
  } catch (e) {
    dispatch(appError.actions.setAppError(responseError(e)))
  }
}
