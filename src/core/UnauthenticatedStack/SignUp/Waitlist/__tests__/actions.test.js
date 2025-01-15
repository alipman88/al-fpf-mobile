import { api } from '@fpf/common/api'
import { appMessage } from '@fpf/components/AppMessage/slice'
import { joinWaitlist } from '../actions'

describe('Address - actions', () => {
  describe('joinWaitlist', () => {
    const values = {
      streetNumber: '32',
      aptNumber: '200',
      streetName: 'Yonge St',
      city: 'Toronto',
      state: 'ON',
      firstName: 'foo',
      lastName: 'bar',
      webAddress: 'web.addr',
      organizationName: 'org name',
      comment: 'comment',
      reference: 'reference',
    }

    test('it hits teh api with waitlist info', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {})
      const dispatch = jest.fn()

      await joinWaitlist(values)(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/waitlist_users', {
        user: {
          apt_number: '200',
          street_number: '32',
          street_name: 'Yonge St',
          city: 'Toronto',
          state: 'ON',
          first_name: 'foo',
          last_name: 'bar',
          web_address: 'web.addr',
          organization_name: 'org name',
          comment: 'comment',
          reference: 'reference',
        },
      })
      post.mockRestore()
    })

    test('API request failure dispatches error', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })
      const dispatch = jest.fn()

      await joinWaitlist(values)(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/waitlist_users', {
        user: {
          apt_number: '200',
          street_number: '32',
          street_name: 'Yonge St',
          city: 'Toronto',
          state: 'ON',
          first_name: 'foo',
          last_name: 'bar',
          web_address: 'web.addr',
          organization_name: 'org name',
          comment: 'comment',
          reference: 'reference',
        },
      })

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom'),
      )

      post.mockRestore()
    })
  })
})
