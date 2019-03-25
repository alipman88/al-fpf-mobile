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
