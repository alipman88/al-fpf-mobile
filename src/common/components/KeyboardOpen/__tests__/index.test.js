import React from 'react'
import { shallow } from 'enzyme'
import { Keyboard } from 'react-native'

import { KeyboardOpen } from '../index'

describe('KeyboardOpen', () => {
  const defaultProps = {
    render: () => {},
  }

  test('subscribes to keyboard events onmount', () => {
    jest.spyOn(Keyboard, 'addListener')

    const wrapper = shallow(<KeyboardOpen {...defaultProps} />)
    wrapper.instance().componentDidMount()
    expect(Keyboard.addListener).toHaveBeenCalledWith(
      'keyboardDidShow',
      expect.any(Function)
    )
    expect(Keyboard.addListener).toHaveBeenCalledWith(
      'keyboardDidHide',
      expect.any(Function)
    )
  })

  test('keyboardDidHide sets state to keyboardOpen: false', () => {
    const wrapper = shallow(<KeyboardOpen {...defaultProps} />)
    wrapper.setState({ keyboardOpen: true })
    wrapper.instance().keyboardDidHide()
    expect(wrapper.state().keyboardOpen).toEqual(false)
  })
})
