module.exports = {
  acknowledgePurchaseAndroid: jest.fn(),
  finishTransaction: jest.fn(),
  getSubscriptions: productIds => new Promise((resolve, reject) => resolve(productIds)),
  purchaseErrorListener: () => ({ remove: jest.fn() }),
  purchaseUpdatedListener: () => ({ remove: jest.fn() }),
  initConnection: () => Promise.resolve(),
  requestSubscription: () => new Promise()
}
