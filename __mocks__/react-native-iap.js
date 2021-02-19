module.exports = {
  acknowledgePurchaseAndroid: jest.fn(),
  finishTransactionIOS: jest.fn(),
  getProducts: productIds => new Promise((resolve, reject) => resolve(productIds)),
  purchaseErrorListener: () => ({ remove: jest.fn() }),
  purchaseUpdatedListener: () => ({ remove: jest.fn() }),
  initConnection: () => Promise.resolve(),
  requestSubscription: () => new Promise()
}
