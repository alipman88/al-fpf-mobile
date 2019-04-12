const messaging = {
  getToken: jest.fn().mockReturnValue('fcmToken'),
  deleteToken: jest.fn(),
  hasPermission: jest.fn().mockReturnValue(true),
  onMessage: jest.fn(),
  onTokenRefresh: jest.fn(),
  requestPermission: jest.fn(),
  subscribeToTopic: jest.fn()
}

const notificationsFactory = {
  android: {
    createChannel: jest.fn()
  },
  onNotification: jest.fn(),
  getInitialNotification: jest.fn(),
  onNotificationOpened: jest.fn()
}

const notifications = () => notificationsFactory

notifications.Android = {
  Channel: () => {
    const channel = {}
    channel.setDescription = jest.fn(() => channel)
    channel.setShowBadge = jest.fn(() => channel)
    return channel
  },
  Importance: {
    Max: 1
  }
}

notifications.Notification = function() {
  return {
    setNotificationId: function() {
      return this
    },
    setTitle: function() {
      return this
    },
    setBody: function() {
      return this
    },
    setData: function() {
      return this
    },
    setSound: function() {
      return this
    }
  }
}

const iid = {
  delete: jest.fn()
}

module.exports = {
  messaging: () => messaging,
  iid: () => iid,
  notifications
}
