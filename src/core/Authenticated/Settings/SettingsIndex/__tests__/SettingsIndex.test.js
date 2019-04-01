import React from 'react'
import firebase from 'react-native-firebase'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { SettingsIndex } from '../SettingsIndex'
import { NavLink } from '../components/NavLink'

describe('SettingsIndex', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn(),
      dispatch: jest.fn()
    },
    navigateWithToken: jest.fn(),
    resetAction: jest.fn(),
    logoutUser: jest.fn(),
    user: {
      first_name: 'John',
      last_name: 'Smith',
      profiles: [
        {
          id: 5
        }
      ]
    }
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
    defaultProps.navigation.dispatch.mockReset()
    defaultProps.navigateWithToken.mockReset()
    defaultProps.resetAction.mockReset()
  })

  test('can click to view account', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper
      .find(NavLink)
      .at(0)
      .simulate('press')
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Account')
  })

  test('can click to view profile', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper
      .find(NavLink)
      .at(1)
      .simulate('press')
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Profile', {
      profileId: 5
    })
  })

  test('can view posts', () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    wrapper
      .find(TouchableOpacity)
      .at(0)
      .simulate('press')
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/posts',
      expect.any(Function)
    )
  })

  test('can logout', async () => {
    const wrapper = shallow(<SettingsIndex {...defaultProps} />)
    await wrapper
      .find(TouchableOpacity)
      .at(1)
      .simulate('press')

    expect(defaultProps.logoutUser).toHaveBeenCalled()
    expect(firebase.iid().delete).toHaveBeenCalled()
    firebase.iid().delete.mockReset()
  })
})
