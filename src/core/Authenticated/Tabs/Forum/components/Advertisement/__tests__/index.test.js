import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { Button } from '@components/Button'
import { Disclaimer } from '@core/Authenticated/Tabs/Forum/components/sharedStyles'
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
    fpf_url:
      'https://frontporchforum.com/?app_info=FpfMobileApp%2F802.1.0&utm_medium=app',
  }

  test('onPress button opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Advertisement {...defaultProps} />)
    wrapper.find(Button).simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.fpf_url)
    openURLSpy.mockRestore()
  })

  test('onPress premium image opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Advertisement {...defaultProps} />)
    wrapper.find(TouchableOpacity).first().simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.fpf_url)
    openURLSpy.mockRestore()
  })

  test('renders ad disclaimer', () => {
    const props = {
      ...defaultProps,
      ad: {
        ...defaultProps.ad,
        disclaimer: { content_plain: 'foo', content_html: 'bar' },
      },
    }
    const wrapper = shallow(<Advertisement {...props} />)

    expect(wrapper.find(Disclaimer).length).toEqual(1)
  })
})
