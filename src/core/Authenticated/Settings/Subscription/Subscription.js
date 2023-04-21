import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'

import { Button } from '@components/Button'
import { ExternalLink } from '@components/ExternalLink'
import { ScreenContainer } from '@components/ScreenContainer'

import {
  PageWrapper,
  Title,
  Description,
  ButtonHint,
  ButtonWrapper,
  HelpText,
} from './styledComponents'

export class Subscription extends React.Component {
  purchase = async (productId) => {
    this.props.requestSubscription(productId, this.props.profile.id)
  }

  /**
   * Renders a purchase product button.
   *
   * For Apple design requirements (e.g. amount that will be billed must be
   * the most prominent pricing element in the layout), see:
   * https://developer.apple.com/app-store/subscriptions/
   */
  subscriptionButton(product) {
    // LATER: revisit this code for Google Play support [#168313664]
    const interval = product.subscriptionPeriodUnitIOS
    const intervalHuman =
      interval[0].toUpperCase() + interval.substr(1).toLowerCase()

    let perMonthText
    if (interval === 'YEAR') {
      const perMonthPrice = Number(product.price) / 12
      const perMonth = perMonthPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: product.currency,
      })
      perMonthText = `(12 months at ${perMonth}/mo.)`
    }

    return (
      <ButtonWrapper key={product.productId}>
        <Button
          key={product.productId}
          onPress={() => this.purchase(product.productId)}
        >
          {`${product.localizedPrice} / ${intervalHuman}`}
        </Button>

        {perMonthText && <ButtonHint>{perMonthText}</ButtonHint>}
      </ButtonWrapper>
    )
  }

  render() {
    const {
      products,
      profile,
      purchasing,
      hasSubscription,
      navigateWithToken,
    } = this.props

    let content

    const profilePlan = profile.profile_plan

    if (hasSubscription) {
      content = (
        <PageWrapper>
          <Title>{profilePlan.name} Plan</Title>

          {/* prettier-ignore */}
          <Description>
            You are subscribed to the
            FPF {profilePlan.tier} {profilePlan.plan_type} plan.
          </Description>
        </PageWrapper>
      )
    } else if (profile.user_available_upgrades.length) {
      let paymentOptions = profile.user_available_upgrades.map((plan) => (
        <React.Fragment key={plan.id}>
          <Title>{plan.name}</Title>

          {plan.description
            .replace(/<[^>]*>?/gm, '') // strip out html tags
            .match(/[^\r\n]+/g) // split on line breaks
            .map((segment) => (
              <Description key={plan.id}>{segment}</Description>
            ))}

          {products
            .filter((product) =>
              product.productId.startsWith(`${plan.tier}_${plan.plan_type}_`)
            )
            .map((product) => this.subscriptionButton(product))}
        </React.Fragment>
      ))

      content = (
        <PageWrapper>
          <Spinner visible={purchasing} />

          {paymentOptions}

          <HelpText>
            Payment will be charged to your Apple ID account at the confirmation
            of purchase. Subscription automatically renews unless it is canceled
            at least 24 hours before the end of the current period. Your account
            will be charged for renewal within 24 hours prior to the end of the
            current period. You can manage and cancel your subscriptions by
            going to your account settings on the App Store after purchase.
          </HelpText>

          <ExternalLink
            content='Terms of Use'
            onPress={() => navigateWithToken('/terms-of-use')}
          />

          <ExternalLink
            content='Privacy Policy'
            onPress={() => navigateWithToken('/privacy-policy')}
          />
        </PageWrapper>
      )
    } else {
      content = (
        <PageWrapper>
          <Title>No upgrades available</Title>
        </PageWrapper>
      )
    }

    return (
      <ScreenContainer withPadding={false} grey>
        <ScrollView>{content}</ScrollView>
      </ScreenContainer>
    )
  }
}

Subscription.propTypes = {
  hasSubscription: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  purchasing: PropTypes.bool,
  requestSubscription: PropTypes.func.isRequired,
}
