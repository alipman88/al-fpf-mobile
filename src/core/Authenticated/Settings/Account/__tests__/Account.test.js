import React from 'react'
import { shallow } from 'enzyme'
import { Switch, TouchableOpacity } from 'react-native'

import { Account } from '../Account'
import { ExternalLink } from '../../components/ExternalLink'

describe('Account', () => {
  const defaultProps = {
    loading: false,
    navigateWithToken: jest.fn(),
    user: {},
    updateUser: jest.fn()
  }

  afterEach(() => {
    defaultProps.navigateWithToken.mockReset()
    defaultProps.updateUser.mockReset()
  })

  test('changing the switch should call updateUser', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    wrapper
      .find(Switch)
      .at(0)
      .simulate('valueChange', true)
    expect(defaultProps.updateUser).toHaveBeenCalledWith({
      receive_issue_push_notifications: true
    })
  })

  test('changing the switch should call updateUser', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    wrapper
      .find(Switch)
      .at(1)
      .simulate('valueChange', true)
    expect(defaultProps.updateUser).toHaveBeenCalledWith({
      receive_issue_emails: true
    })
  })

  test('External links open the right places', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    const nodes = wrapper.find(ExternalLink)
    nodes.forEach(node => node.simulate('press'))

    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith('/user')
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/subscriptions'
    )
  })

  test('TouchableOpacity for close account navigates to right url', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')

    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith('/user')
  })
})
