import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { Button } from '@components/Button'
import { Advertisement } from '../index'

describe('Advertisement', () => {
  const defaultProps = {
    ad: {
      url: 'https://frontporchforum.com',
      link_text: 'Website',
      headline: 'Advertisement',
      body: 'This is some ad copy',
      image_url: 'https://cdn.frontporchforum.com/image.png',
    },
    navigateWithToken: jest.fn(),
  }

  test('onPress button opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Advertisement {...defaultProps} />)
    wrapper.find(Button).simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.ad.url)
    openURLSpy.mockRestore()
  })

  test('onPress premium image opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Advertisement {...defaultProps} />)
    wrapper.find(TouchableOpacity).first().simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.ad.url)
    openURLSpy.mockRestore()
  })
})
