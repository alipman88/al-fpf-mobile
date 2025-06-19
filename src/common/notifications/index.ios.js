import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

/**
 * Returns true if the messaging permission is enabled.  Async function.
 *
 * @returns {boolean}
 */
export async function hasMessagingPermission() {
  const authStatus = await messaging().hasPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  return enabled
}

/**
 * Requests the messaging permission, and returns true if it is granted by the user.
 * Async function.
 *
 * @returns {boolean}
 */
export async function requestMessagingPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  return enabled
}

/**
 * Sets the app badge number to the given value. Only relevant to iOS. Async function.
 * NOTE: this functionality isn't available via @react-native-firebase, so we use
 * push-notification-ios instead to set the badge number.
 *
 * @param value {number}
 */
export async function setApplicationIconBadgeNumber(value) {
  PushNotificationIOS.getApplicationIconBadgeNumber((badgeNumber) => {
    if (badgeNumber !== value) {
      PushNotificationIOS.setApplicationIconBadgeNumber(value)
    }
  })
}
