import { api } from '@common/api'
import { appError } from '@components/AppError/slice'
import { joinWaitlist } from '../actions'

describe('Address - actions', () => {
  describe('joinWaitlist', () => {
    const values = {
      streetNumber: 32,
      secondaryAddress: '200',
      streetName: 'Yonge St',
      city: 'Toronto',
      state: ['ON'],
      firstName: 'foo',
      lastName: 'bar'
    }

    test('it hits teh api with waitlist info', async () => {
      const post = jest.spyOn(api, 'post').mockImplementation(() => {})
      const dispatch = jest.fn()

      await joinWaitlist(values)(dispatch, () => ({}))

      expect(post).toHaveBeenCalledWith('/waitlist_users', {
        user: {
          streetNumber: 32,
          secondaryAddress: '200',
          streetName: 'Yonge St',
          firstName: 'foo',
          lastName: 'bar',
          street_number: 32,
          street_name: 'Yonge St',
          city: 'Toronto',
          state: 'ON',
          first_name: 'foo',
          last_name: 'bar'
        }
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
          streetNumber: 32,
          secondaryAddress: '200',
          streetName: 'Yonge St',
          firstName: 'foo',
          lastName: 'bar',
          street_number: 32,
          street_name: 'Yonge St',
          city: 'Toronto',
          state: 'ON',
          first_name: 'foo',
          last_name: 'bar'
        }
      })

      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('boom')
      )

      post.mockRestore()
    })
  })
})
