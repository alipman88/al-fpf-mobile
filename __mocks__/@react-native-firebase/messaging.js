const methods = {
  getToken: jest.fn().mockResolvedValue('fcmToken'),
  getAPNSToken: jest.fn().mockResolvedValue('apnsToken'),
  setBackgroundMessageHandler: jest.fn(),
  hasPermission: jest.fn().mockResolvedValue(1),
  requestPermission: jest.fn().mockResolvedValue(true),
  onTokenRefresh: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  onMessage: jest.fn(),
  getInitialNotification: jest.fn().mockResolvedValue(null),
}

const module_ = () => {
  return methods
}

module_.AuthorizationStatus = {
  NOT_DETERMINED: -1,
  DENIED: 0,
  AUTHORIZED: 1,
  PROVISIONAL: 2,
}

module.exports = module_
