import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { SettingsIndex } from '../SettingsIndex'
import { NavLink } from '../../components/NavLink'

describe('SettingsIndex', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn(),
      dispatch: jest.fn(),
    },
    navigateWithToken: jest.fn(),
    resetAction: jest.fn(),
    getProfiles: jest.fn(),
    logoutUser: jest.fn().mockResolvedValue(),
    user: {
      first_name: 'John',
      last_name: 'Smith',
      profiles: [
        {
          id: 5,
          name: 'John Smith',
        },
      ],
    },
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
    defaultProps.navigation.dispatch.mockReset()
    defaultProps.navigateWithToken.mockReset()
    defaultProps.resetAction.mockReset()
  })

  test('can click to view account', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper.find(NavLink).at(0).simulate('press')

    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Account')
    expect(defaultProps.getProfiles).toHaveBeenCalled()
  })

  test('can click to view profile', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper.find(NavLink).at(1).simulate('press')
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Profile', {
      profileId: 5,
    })
  })

  test('can view posts', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper.find(TouchableOpacity).at(0).simulate('press')
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/submissions',
    )
  })

  test('can logout', async () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    await wrapper.find(TouchableOpacity).at(5).simulate('press')

    expect(defaultProps.logoutUser).toHaveBeenCalled()
  })
})
