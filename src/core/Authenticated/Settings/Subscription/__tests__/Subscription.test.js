import React from 'react'
import { shallow } from 'enzyme'

import { Button } from '@components/Button'
import { Description } from '../styledComponents'
import { Subscription } from '../Subscription'

describe('Subscription', () => {
  const defaultProps = {
    hasSubscription: false,
    navigation: {
      navigate: jest.fn(),
    },
    navigateWithToken: jest.fn(),
    profile: {
      id: 4,
      area_ids: [1, 3],
      profile_plan: {
        id: 1,
        name: 'Business/ nonprofit',
        plan_type: 'business',
        tier: 'standard',
        has_upgrades: true,
      },
      home_nf: 1,
      name: 'foo',
    },
    products: [
      {
        productId: 'standard_business_monthly',
        title: 'Standard Business (Monthly)',
        localizedPrice: '$8.99',
        subscriptionPeriodUnitIOS: 'MONTH',
        price: '8.99',
        currency: 'USD',
      },
      {
        productId: 'standard_business_yearly',
        title: 'Standard Business (Yearly)',
        localizedPrice: '$95.99',
        subscriptionPeriodUnitIOS: 'YEAR',
        price: '95.99',
        currency: 'USD',
      },
      {
        productId: 'standard_government_monthly',
        title: 'Standard government (Monthly)',
        localizedPrice: '$8.99',
        subscriptionPeriodUnitIOS: 'MONTH',
        price: '7.99',
        currency: 'USD',
      },
      {
        productId: 'standard_government_yearly',
        title: 'Standard government (Yearly)',
        localizedPrice: '$95.99',
        subscriptionPeriodUnitIOS: 'YEAR',
        price: '95.99',
        currency: 'USD',
      },
    ],
    purchasing: false,
    requestSubscription: jest.fn(),
  }

  test('products render as buttons', () => {
    const wrapper = shallow(<Subscription {...defaultProps} />)
    const buttons = wrapper.find(Button)
    expect(buttons.length).toEqual(2)

    const b1 = buttons.at(0)
    const b2 = buttons.at(1)
    expect(b1.key()).toEqual('standard_business_monthly')
    expect(b1.children().text()).toEqual('$8.99 / Month')
    expect(b2.key()).toEqual('standard_business_yearly')
    expect(b2.children().text()).toEqual('$95.99 / Year')
  })

  test('has subscription renders information only', () => {
    const wrapper = shallow(
      <Subscription {...{ ...defaultProps, hasSubscription: true }} />
    )

    expect(wrapper.find(Button).length).toEqual(0)
    expect(wrapper.find(Description).text()).toEqual(
      'You are subscribed to the FPF Business/ nonprofit standard plan.'
    )
  })
})
