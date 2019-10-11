import { connect } from 'react-redux'

import { Subscription as SubscriptionComponent } from './Subscription'
import { products } from '@common/products'
import { purchases } from '@common/purchases'
import { profile } from '@common/profile'
import { requestSubscription } from '@common/purchases'

const mapStateToProps = (state, props) => {
  const profileId = props.navigation.getParam('profileId', 0)

  return {
    products: products.selectors.getProducts(state),
    purchasing: purchases.selectors.getPurchasing(state),
    profile: profile.selectors
      .getProfiles(state)
      .find(profile => profile.id === profileId),
    ...profile.selectors.getSubscriptionState(state)[profileId]
  }
}

export const Subscription = connect(
  mapStateToProps,
  {
    requestSubscription
  }
)(SubscriptionComponent)
