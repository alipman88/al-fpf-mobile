import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity, Linking } from 'react-native'

import { Success } from '../index'
import { Close } from '../styledComponents'

describe('Success', () => {
  const defaultProps = {
    onClose: jest.fn()
  }

  afterEach(() => {
    defaultProps.onClose.mockReset()
  })

  test('pressing close button triggers onClose prop', () => {
    const wrapper = shallow(<Success {...defaultProps} />)
    wrapper.find(Close).simulate('press')
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  test('pressing link button opens webpage', () => {
    const linkSpy = jest.spyOn(Linking, 'openURL')
    const wrapper = shallow(<Success {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')
    expect(linkSpy).toHaveBeenCalledWith(
      'https://frontporchforum.com/user/posts'
    )
    linkSpy.mockRestore()
  })
})
