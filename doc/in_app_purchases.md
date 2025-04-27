### In app purchases

In app purchases for profile subscriptions are supported on iOS only (because
Apple required them for the original app submission).

Purchaseable products are configured through the App Store Connect website:
https://appstoreconnect.apple.com/apps/1458651656/appstore/addons?m=

However, the simulator does not connect to the app store, so debug only products
are also configured in `ios/Configuration.storekit`.  These products are only
shown in the simulator.
