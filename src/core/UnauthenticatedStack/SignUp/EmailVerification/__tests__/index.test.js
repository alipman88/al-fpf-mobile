import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { api } from '@fpf/common/api'
import { EmailVerification } from '../EmailVerification'
import { HelpMessage } from '../styledComponents'

describe('EmailVerification', () => {
  const defaultProps = {
    email: 'foo@bar.com',
    resendEmail: jest.fn(),
    navigation: {
      navigate: jest.fn(),
    },
    newUser: {
      profileType: 'business',
      email: 'bob@ross.com',
    },
    profileType: 'business',
    clearUserData: jest.fn(),
    setRegistrationEmail: jest.fn(),
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
  })

  test('renders different content for different profile types', () => {
    const wrapper = shallow(<EmailVerification {...defaultProps} />)
    expect(wrapper.find(HelpMessage).length).toEqual(3)

    wrapper.setProps({ profileType: 'government' })
    expect(wrapper.find(HelpMessage).length).toEqual(1)
  })

  test('it sets registration email on mount', () => {
    shallow(<EmailVerification {...defaultProps} />)
    expect(defaultProps.setRegistrationEmail).toHaveBeenCalledWith(
      'bob@ross.com',
    )
  })

  test('it clears data and navigates on Login link tap', () => {
    const wrapper = shallow(<EmailVerification {...defaultProps} />)
    wrapper.find(TouchableOpacity).last().simulate('press')
    expect(defaultProps.clearUserData).toHaveBeenCalled()
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Login')
  })

  describe('resendEmail', () => {
    test('hits the api, clears data', async () => {
      const wrapper = shallow(<EmailVerification {...defaultProps} />)
      jest.spyOn(api, 'post').mockImplementation(() => ({}))
      await wrapper.find(TouchableOpacity).first().props().onPress()

      expect(defaultProps.resendEmail).toHaveBeenCalledWith(defaultProps.email)
      api.post.mockRestore()
    })
  })
})
