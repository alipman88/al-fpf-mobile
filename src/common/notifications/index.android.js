import { PermissionsAndroid } from 'react-native'

/**
 * Returns true if the messaging permission is enabled.  Async function.
 *
 * @returns {boolean}
 */
export async function hasMessagingPermission() {
  const check = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  )
  return check
}

/**
 * Requests the messaging permission, and returns true if it is granted by the user.
 * Async function.
 *
 * @returns {boolean}
 */
export async function requestMessagingPermission() {
  const request = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  )
  return request === PermissionsAndroid.RESULTS.GRANTED
}

/**
 * Sets the app badge number to the given value.  Unsupported on Android.
 * Async function.
 *
 * @param value {number}
 */
export async function setApplicationIconBadgeNumber(value) {
  // no-op
}
