import React from 'react'
import { shallow } from 'enzyme'
import { Switch, TouchableOpacity } from 'react-native'

import { Account } from '../Account'
import { ExternalLink } from '../../components/ExternalLink'

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'abcdefgh123'
}))

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
    wrapper.find(Switch).simulate('valueChange', true)
    expect(defaultProps.updateUser).toHaveBeenCalledWith({
      receive_push_notifications: true
    })
  })

  test('External links open the right places', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    const nodes = wrapper.find(ExternalLink)
    nodes.forEach(node => node.simulate('press'))

    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user',
      expect.any(Function)
    )
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/abcdefgh123/subscriptions',
      expect.any(Function)
    )
  })

  test('TouchableOpacity for close account navigates to right url', () => {
    const wrapper = shallow(<Account {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')

    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user',
      expect.any(Function)
    )
  })
})
