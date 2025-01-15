import { connect } from 'react-redux'

import { navigateWithToken } from '@fpf/common/actions/navigateWithToken'
import { Subscription as SubscriptionComponent } from './Subscription'
import { products } from '@fpf/common/products'
import { purchases } from '@fpf/common/purchases'
import { profile } from '@fpf/common/profile'
import { requestSubscription } from '@fpf/common/purchases'

const mapStateToProps = (state, props) => ({
  products: products.selectors.getProducts(state),
  purchasing: purchases.selectors.getPurchasing(state),
  profile: profile.selectors.getNavigationProfile(state, props),
  ...profile.selectors.getNavigationProfileSubscriptionState(state, props),
})

export const Subscription = connect(mapStateToProps, {
  navigateWithToken,
  requestSubscription,
})(SubscriptionComponent)
