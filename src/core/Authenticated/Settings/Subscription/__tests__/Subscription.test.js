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
        name: 'Business (Free)',
        plan_type: 'business',
        tier: 'free',
      },
      user_available_upgrades: [
        {
          id: 1,
          name: 'Business (Standard)',
          plan_type: 'business',
          tier: 'standard',
          description: 'Hello\nworld',
        },
      ],
      home_nf: 1,
      name: 'foo',
    },
    products: [
      {
        productId: 'standard_business_monthly',
        title: 'Standard Business (Monthly)',
        localizedPrice: '$11.00',
        subscriptionPeriodUnitIOS: 'MONTH',
        price: '11.00',
        currency: 'USD',
      },
      {
        productId: 'standard_business_yearly',
        title: 'Standard Business (Yearly)',
        localizedPrice: '$119.99',
        subscriptionPeriodUnitIOS: 'YEAR',
        price: '119.99',
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
    expect(b1.children().text()).toEqual('$11.00 / Month')
    expect(b2.key()).toEqual('standard_business_yearly')
    expect(b2.children().text()).toEqual('$119.99 / Year')
  })

  test('receives dynamic profile plan descriptions from api', () => {
    const wrapper = shallow(<Subscription {...defaultProps} />)

    const d1 = wrapper.find(Description).at(0)
    const d2 = wrapper.find(Description).at(1)

    expect(d1.text()).toEqual('Hello')
    expect(d2.text()).toEqual('world')
  })

  test('has subscription renders information only', () => {
    const wrapper = shallow(
      <Subscription {...{ ...defaultProps, hasSubscription: true }} />
    )

    expect(wrapper.find(Button).length).toEqual(0)
    expect(wrapper.find(Description).text()).toEqual(
      'You are subscribed to the FPF free business plan.'
    )
  })
})
