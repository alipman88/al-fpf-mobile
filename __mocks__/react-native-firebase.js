const messaging = {
  getToken: jest.fn().mockReturnValue('fcmToken'),
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
  onNotification: jest.fn()
}

const notifications = () => notificationsFactory

notifications.Android = {
  Channel: () => ({
    setDescription: jest.fn()
  }),
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
