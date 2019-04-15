import firebase from 'react-native-firebase'

export const createChannel = (id = 'test-channel', name = 'Test Channel') => {
  const channel = new firebase.notifications.Android.Channel(
    id,
    name,
    firebase.notifications.Android.Importance.Max
  )
    .setDescription('Front Porch Forum')
    .setShowBadge(true)

  // Create the channel
  firebase.notifications().android.createChannel(channel)

  return channel
}
