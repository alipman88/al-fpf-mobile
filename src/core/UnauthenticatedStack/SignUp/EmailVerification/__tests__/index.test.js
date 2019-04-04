import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { api } from '@common/api'
import { EmailVerification } from '../EmailVerification'
import { HelpMessage } from '../styledComponents'

describe('EmailVerification', () => {
  const defaultProps = {
    email: { email: 'foo@bar.com' },
    resendEmail: jest.fn(),
    navigation: {
      navigate: jest.fn()
    },
    newUser: {
      profileType: 'business'
    }
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

  describe('resendEmail', () => {
    test('hits the api', async () => {
      const wrapper = shallow(<EmailVerification {...defaultProps} />)
      jest.spyOn(api, 'post').mockImplementation(() => ({}))
      await wrapper
        .find(TouchableOpacity)
        .first()
        .props()
        .onPress()

      expect(defaultProps.resendEmail).toHaveBeenCalled()
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Login')

      api.post.mockRestore()
    })
  })
})
