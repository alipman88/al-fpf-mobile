import React from 'react'
import { Linking } from 'react-native'
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
})
