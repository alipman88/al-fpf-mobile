import RNIap from 'react-native-iap'

import { products as slice } from './slice'

/**
 * Get In App Purchasing products that are defined in the App Store
 * (via react-native-iap).
 */
export const getProducts = productIds => async (dispatch, getState) => {
  try {
    if (productIds && productIds.length) {
      dispatch(slice.actions.setLoading(true))
      const products = await RNIap.getProducts(productIds)
      dispatch(slice.actions.setProducts(products))
    }
  } catch (err) {
    console.warn(err)
  } finally {
    dispatch(slice.actions.setLoading(false))
  }
}
