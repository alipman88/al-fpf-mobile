import { api } from '@fpf/common/api'

import { appMessage } from '@fpf/components/AppMessage/slice'
import { resendEmail } from '../actions'

describe('EmailVerification - actions', () => {
  describe('resendEmail', () => {
    test('requests results from server', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {})
      const dispatch = jest.fn()

      await resendEmail('foo@bar.com')(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/resend_email_verification', {
        email: 'foo@bar.com',
      })
      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppMessage({
          type: 'success',
          message: 'Verification resent',
          autoHide: true,
        }),
      )

      post.mockRestore()
    })

    test('API request failure dispatches error', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })
      const dispatch = jest.fn()

      await resendEmail('foo@bar.com')(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/resend_email_verification', {
        email: 'foo@bar.com',
      })

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom'),
      )

      post.mockRestore()
    })
  })
})
