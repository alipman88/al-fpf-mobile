const methods = {
  logEvent: jest.fn(),
  setAnalyticsCollectionEnabled: jest.fn(),
  logScreenView: jest.fn(),
}

const module_ = () => {
  return methods
}

module.exports = module_
