import { api } from '@common/api'

import { appError } from '@components/AppError/slice'
import { resendEmail } from '../actions'

describe('EmailVerification - actions', () => {
  describe('resendEmail', () => {
    test('requests results from server', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {})
      const dispatch = jest.fn()

      await resendEmail({
        email: 'foo@bar.com'
      })(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/resend_email_verification', {
        email: 'foo@bar.com'
      })
      expect(dispatch).not.toHaveBeenCalled()

      post.mockRestore()
    })

    test('API request failure dispatches error', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })
      const dispatch = jest.fn()

      await resendEmail({ email: 'foo@bar.com' })(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/resend_email_verification', {
        email: 'foo@bar.com'
      })

      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('boom')
      )

      post.mockRestore()
    })
  })
})
