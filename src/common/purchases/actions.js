import { Platform } from 'react-native'
import RNIap from 'react-native-iap'

import * as api from '@common/api'
import { appMessage } from '@components/AppMessage/slice'
import { profile } from '@common/profile'
import { purchases as slice } from './slice'
import { responseError } from '@common/utils/responseError'

/**
 * Request the purchase of a subscription for the given IAP product SKU for the
 * given profile ID.  If a request is successfully started, the purchasing state
 * is set to true.
 *
 * Note that this method returns before a purchase is complete.  To listen for
 * changes in the purchase transaction queue, set up queue listeners (via
 * react-native-iap's purchaseUpdatedListener and purchaseErrorListener methods)
 * that call the purchaseUpdated and purchaseError actions.
 */
export const requestSubscription = (productId, profileId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(slice.actions.setPurchasing({ profileId }))
    await RNIap.requestSubscription(productId)
  } catch (e) {
    const message = 'string' === typeof e ? e : e.message
    dispatch(appMessage.actions.setAppError(message))
    dispatch(slice.actions.setPurchasing(false))
  }
}

/**
 * Respond to a purchase transaction success event from the native IAP queue.
 * This method will validate the receipt with the FPF API, and then complete
 * the purchase locally and display a success message.
 *
 * On iOS, this method is called when the payment queue registers a
 * SKPaymentTransactionStatePurchased event.
 */
export const purchaseUpdated = purchase => async (dispatch, getState) => {
  try {
    // NOTE: on iOS, react-native-iap gets this from the newer "iOS 7 style"
    // ([[NSBundle mainBundle]appStoreReceiptURL]) rather than from the
    // deprecated "iOS 6 style" (transaction.transactionReceipt)
    const receipt = purchase.transactionReceipt
    const profileId = slice.selectors.getProfileId(getState())

    if (receipt && profileId) {
      // Verify the receipt via the FPF API
      const response = await api.putAuthorized(
        `/profiles/${profileId}/apple_subscription`,
        { receipt },
        getState()
      )

      // The verify receipt API returns an updated user profile.  Store it.
      dispatch(
        profile.actions.setUserProfile({ profiles: [response.data.profile] })
      )

      dispatch(
        appMessage.actions.setAppMessage({
          message: 'FPF plan upgrade successful!',
          type: 'success',
          autoHide: true
        })
      )

      // Acknowledge the transaction via the native IAP API.  (Otherwise, the
      // API won't consider the purchase complete).
      if (Platform.OS === 'ios') {
        RNIap.finishTransactionIOS(purchase.transactionId)
      } else if (Platform.OS === 'android') {
        // Assume non-consumable product
        RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken)
      }
    }
  } catch (e) {
    let message

    // If an error occurs (even a receipt validation), we do not clear the
    // purchasing state or attempt to cancel the transaction (which actually
    // doesn't appeat to be possible).  Instead, the purchase validation will
    // reoccur a few times before being automatically canceled by the native
    // IAP API.

    // An error from the API should include the `response` prop (per the Axios
    // library).  Handle any other error more generically.
    if (e.response) {
      message = responseError(e)
    } else {
      message = 'string' === typeof e ? e : e.message
    }

    dispatch(appMessage.actions.setAppError(message))
  } finally {
    dispatch(slice.actions.setPurchasing(false))
  }
}

/**
 * Respond to a purchase transaction error event from the native IAP queue.
 * This method will display the error message.
 *
 * On iOS, this method is called when the payment queue registers a
 * SKPaymentTransactionStateFailed event.
 */
export const purchaseError = error => (dispatch, getState) => {
  dispatch(appMessage.actions.setAppError(error.message))
  dispatch(slice.actions.setPurchasing(false))
}
