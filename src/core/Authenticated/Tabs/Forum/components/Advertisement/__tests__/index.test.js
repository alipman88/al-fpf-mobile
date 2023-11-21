import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { Button } from '@components/Button'
import { Disclaimer } from '@core/Authenticated/Tabs/Forum/components/sharedStyles'
import { Advertisement } from '../index'
import { Ad } from '../ad'
import { SponsorshipAd } from '../sponsorshipAd'

const ad = {
  url: 'https://frontporchforum.com',
  link_text: 'Website',
  headline: 'Advertisement',
  body: 'This is some ad copy',
  image_url: 'https://cdn.frontporchforum.com/image.png',
}

const sponsorshipAd = {
  url: 'https://frontporchforum.com',
  link_text: 'Website',
  headline: 'Advertisement',
  body: 'This is some ad copy',
  image_url: 'https://cdn.frontporchforum.com/image.png',
  ad_type: 'sponsorship',
}

describe('Advertisement', () => {
  const defaultProps = {
    navigateWithToken: jest.fn(),
    fpf_url:
      'https://frontporchforum.com/?app_info=FpfMobileApp%2F802.1.0&utm_medium=app',
  }

  test('renders ad', () => {
    const props = {
      ...defaultProps,
      ad,
    }
    const wrapper = shallow(<Advertisement {...props} />)
    expect(wrapper.find(Ad).length).toEqual(1)
  })

  test('renders sponsorship ad', () => {
    const props = {
      ...defaultProps,
      ad: sponsorshipAd,
    }
    const wrapper = shallow(<Advertisement {...props} />)
    expect(wrapper.find(SponsorshipAd).length).toEqual(1)
  })
})

describe('Ad', () => {
  const defaultProps = {
    ad,
    navigateWithToken: jest.fn(),
    fpf_url:
      'https://frontporchforum.com/?app_info=FpfMobileApp%2F802.1.0&utm_medium=app',
  }

  test('onPress button opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Ad {...defaultProps} />)
    wrapper.find(Button).simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.fpf_url)
    openURLSpy.mockRestore()
  })

  test('onPress premium image opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<Ad {...defaultProps} />)
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
    const wrapper = shallow(<Ad {...props} />)

    expect(wrapper.find(Disclaimer).length).toEqual(1)
  })
})

describe('SponsorshipAd', () => {
  const defaultProps = {
    ad: sponsorshipAd,
    navigateWithToken: jest.fn(),
    fpf_url:
      'https://frontporchforum.com/?app_info=FpfMobileApp%2F802.1.0&utm_medium=app',
  }

  test('onPress headline opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<SponsorshipAd {...defaultProps} />)
    wrapper.find(TouchableOpacity).last().simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.fpf_url)
    openURLSpy.mockRestore()
  })

  test('onPress premium image opens ad URL', () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => ({}))
    const wrapper = shallow(<SponsorshipAd {...defaultProps} />)
    wrapper.find(TouchableOpacity).first().simulate('press')
    expect(openURLSpy).toHaveBeenCalledWith(defaultProps.fpf_url)
    openURLSpy.mockRestore()
  })
})
