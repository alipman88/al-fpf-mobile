import RNIap from 'react-native-iap'

import * as api from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { requestSubscription, purchaseUpdated, purchaseError } from '../actions'
import { profile } from '@common/profile'
import { purchases } from '../slice'

describe('purchases - actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('requestSubscription', () => {
    test('sets purchasing and calls requestSubscription', async () => {
      const rniapSpy = jest.spyOn(RNIap, 'requestSubscription')

      await requestSubscription('some-sku', 1)(dispatch, () => ({}))

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing({ profileId: 1 })
      )

      expect(rniapSpy).toHaveBeenCalledWith({ sku: 'some-sku' })

      rniapSpy.mockRestore()
    })

    test('error dispatches an error message and resets purchasing', async () => {
      const rniapSpy = jest
        .spyOn(RNIap, 'requestSubscription')
        .mockImplementation(() => {
          throw new Error('boom')
        })

      await requestSubscription('some-sku', 1)(dispatch, () => ({}))

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing(false)
      )

      rniapSpy.mockRestore()
    })

    test('error without message dispatches an error message and resets purchasing', async () => {
      const rniapSpy = jest
        .spyOn(RNIap, 'requestSubscription')
        .mockImplementation(() => {
          throw new Error()
        })

      await requestSubscription('some-sku', 1)(dispatch, () => ({}))

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('The purchase failed')
      )

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing(false)
      )

      rniapSpy.mockRestore()
    })
  })

  describe('purchaseUpdated', () => {
    test('validates a receipt', async () => {
      const updatedProfile = { id: 1, foo: 'bar' }

      const putSpy = jest
        .spyOn(api, 'putAuthorized')
        .mockImplementation(() => ({
          data: { profile: updatedProfile },
        }))

      const rniapSpy = jest.spyOn(RNIap, 'finishTransactionIOS')

      const purchase = {
        transactionReceipt: 'receipt-data',
        productId: 'some-sku',
        transactionId: 'transaction-id',
        purchaseToken: 'purchase-token',
      }

      const getState = () => ({
        main: {
          purchases: {
            purchasing: true,
            profileId: 1,
          },
        },
      })

      await purchaseUpdated(purchase)(dispatch, getState)

      expect(putSpy).toHaveBeenCalledWith(
        '/profiles/1/apple_subscription',
        {
          receipt: 'receipt-data',
        },
        getState()
      )

      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setUserProfile({ profiles: [updatedProfile] })
      )

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing(false)
      )

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppMessage({
          message: 'FPF plan upgrade successful!',
          type: 'success',
          autoHide: true,
        })
      )

      expect(rniapSpy).toHaveBeenCalledWith('transaction-id')

      putSpy.mockRestore()
      rniapSpy.mockRestore()
    })

    test('an api error dispatches an error message', async () => {
      const putSpy = jest.spyOn(api, 'putAuthorized').mockImplementation(() => {
        throw new Error('boom')
      })

      const purchase = {
        transactionReceipt: 'receipt',
        productId: 'product-id',
        transactionId: 'transaction-id',
        purchaseToken: 'purchase-token',
      }

      const getState = () => ({
        main: {
          purchases: {
            purchasing: true,
            profileId: 1,
          },
        },
      })

      await purchaseUpdated(purchase)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing(false)
      )

      putSpy.mockRestore()
    })
  })

  describe('purchaseError', () => {
    test('dispatches an error message and resets purchasing', async () => {
      const getState = () => ({
        main: {
          purchases: {
            purchasing: true,
            profileId: 1,
          },
        },
      })

      await purchaseError(new Error('boom'))(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      expect(dispatch).toHaveBeenCalledWith(
        purchases.actions.setPurchasing(false)
      )
    })
  })
})
