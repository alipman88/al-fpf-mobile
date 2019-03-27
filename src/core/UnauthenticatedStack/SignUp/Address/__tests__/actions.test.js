import * as api from '@common/api'
import { responseError } from '@common/utils/responseError'
import { appError } from '@components/AppError/slice'
import { searchAddress } from '../actions'

describe('Address - actions', () => {
  describe('searchAddress', () => {
    const values = {
      streetNumber: 32,
      secondaryAddress: '200',
      streetName: 'Yonge St',
      city: 'Toronto',
      state: 'ON'
    }

    test('it grabs the address and passes the data to the callback', async () => {
      const onSuccess = jest.fn()
      const dispatch = jest.fn()
      const getState = jest.fn().mockReturnValue('getState')

      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => ({
          data: {
            areas: [],
            address: {}
          }
        }))
      await searchAddress(values, onSuccess)(dispatch, getState)

      expect(postSpy).toHaveBeenCalledWith(
        '/areas/for_address',
        {
          address: {
            street_number: 32,
            apt_number: '200',
            street_name: 'Yonge St',
            city: 'Toronto',
            state: 'ON'
          }
        },
        'getState'
      )

      expect(onSuccess).toHaveBeenCalledWith([], {})
      postSpy.mockRestore()
    })

    test('handles api error', async () => {
      const onSuccess = jest.fn()
      const dispatch = jest.fn()
      const getState = jest.fn().mockReturnValue('getState')

      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => {
          throw new Error('boom')
        })

      await searchAddress(values, onSuccess)(dispatch, getState)
      expect(postSpy).toHaveBeenCalledWith(
        '/areas/for_address',
        {
          address: {
            street_number: 32,
            apt_number: '200',
            street_name: 'Yonge St',
            city: 'Toronto',
            state: 'ON'
          }
        },
        'getState'
      )

      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError(responseError(new Error('boom')))
      )

      expect(onSuccess).not.toHaveBeenCalled()
      postSpy.mockRestore()
    })
  })
})
