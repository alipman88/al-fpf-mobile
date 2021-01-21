import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

import { createChannel, displayNotification } from '@common/notifications'

export const bgMessaging = async notificationMsg => {
  const channel = createChannel()

  displayNotification(
    channel,
    notificationMsg.messageId,
    notificationMsg.data.title,
    notificationMsg.data.body,
    notificationMsg.data
  )

  return Promise.resolve()
}

export async function hasMessagingPermission() {
  const authStatus = await messaging().hasPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  return enabled
}

export async function requestMessagingPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  return enabled
}

export async function setApplicationIconBadgeNumber(value) {
  PushNotificationIOS.getApplicationIconBadgeNumber(badgeNumber => {
    if (badgeNumber !== value) {
      PushNotificationIOS.setApplicationIconBadgeNumber(value)
    }
  })
}
