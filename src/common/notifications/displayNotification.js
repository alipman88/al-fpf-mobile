import firebase from 'react-native-firebase'

export const displayNotification = (channel, id, title, body, data) => {
  const notification = new firebase.notifications.Notification()
    .setNotificationId(id)
    .setTitle(title)
    .setBody(body)
    .setData(data)

  notification.android.setChannelId(channel._channelId)

  firebase.notifications().displayNotification(notification)
}
