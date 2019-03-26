import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { api } from '@common/api'
import { EmailVerification } from '../EmailVerification'

describe('EmailVerification', () => {
  const defaultProps = {
    email: { email: 'foo@bar.com' },
    resendEmail: jest.fn(),
    navigation: {
      navigate: jest.fn()
    }
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
  })

  describe('resendEmail', () => {
    test('hits the api', async () => {
      const wrapper = shallow(<EmailVerification {...defaultProps} />)
      jest.spyOn(api, 'post').mockImplementation(() => ({}))
      await wrapper
        .find(TouchableOpacity)
        .props()
        .onPress()

      expect(defaultProps.resendEmail).toHaveBeenCalled()
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Login')

      api.post.mockRestore()
    })
  })
})
