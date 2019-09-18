import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'

import { Config } from '@common/config'
import { Button } from '@components/Button'
import { ExternalLink } from '@components/ExternalLink'
import { ScreenContainer } from '@components/ScreenContainer'

import { BackButton } from '../components/BackButton'
import {
  PageWrapper,
  Title,
  Description,
  ButtonHint,
  ButtonWrapper,
  HelpText
} from './styledComponents'

export class Subscription extends React.Component {
  purchase = async productId => {
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
        currency: product.currency
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
    const { products, profile, purchasing, hasSubscription } = this.props

    let content

    if (hasSubscription) {
      const profilePlan = profile.profile_plan

      content = (
        <PageWrapper>
          <Title>Business / Nonprofit Plan</Title>

          {/* prettier-ignore */}
          <Description>
            You are subscribed to the
            FPF {profilePlan.name} {profilePlan.tier} plan.
          </Description>
        </PageWrapper>
      )
    } else {
      content = (
        <PageWrapper>
          <Spinner visible={purchasing} />

          <Title>Business / Nonprofit Plan</Title>

          <Description>
            Upgrade to FPF Standard Business Access Plan to receive these
            benefits:
          </Description>

          <Description>
            • Enhanced listing in FPF Business Directory
          </Description>
          <Description>
            • Ability to post on your local FPF up to 12 times/year
          </Description>

          {products.map(product => this.subscriptionButton(product))}

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
            url={`${Config.WEBSITE_HOST}/terms-of-use`}
          />

          <ExternalLink
            content='Privacy Policy'
            url={`${Config.WEBSITE_HOST}/privacy-policy`}
          />
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

Subscription.navigationOptions = ({ navigation }) => ({
  headerLeft: <BackButton navigation={navigation} />,
  title: 'Upgrade FPF Plan'
})

Subscription.propTypes = {
  hasSubscription: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  purchasing: PropTypes.bool,
  requestSubscription: PropTypes.func.isRequired
}
