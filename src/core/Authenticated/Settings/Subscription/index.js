import { connect } from 'react-redux'

import { navigateWithToken } from '@common/actions/navigateWithToken'
import { Subscription as SubscriptionComponent } from './Subscription'
import { products } from '@common/products'
import { purchases } from '@common/purchases'
import { profile } from '@common/profile'
import { requestSubscription } from '@common/purchases'

const mapStateToProps = (state, props) => ({
  products: products.selectors.getProducts(state),
  purchasing: purchases.selectors.getPurchasing(state),
  profile: profile.selectors.getNavigationProfile(state, props),
  ...profile.selectors.getNavigationProfileSubscriptionState(state, props)
})

export const Subscription = connect(
  mapStateToProps,
  {
    navigateWithToken,
    requestSubscription
  }
)(SubscriptionComponent)
