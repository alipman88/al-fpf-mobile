module.exports = {
  acknowledgePurchaseAndroid: jest.fn(),
  finishTransaction: jest.fn(),
  getSubscriptions: ({ skus }) =>
    new Promise((resolve, reject) => resolve(skus)),
  purchaseErrorListener: () => ({ remove: jest.fn() }),
  purchaseUpdatedListener: () => ({ remove: jest.fn() }),
  initConnection: () => Promise.resolve(),
  requestSubscription: jest.fn(),
}
