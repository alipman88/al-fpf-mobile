import React from 'react'
import { shallow } from 'enzyme'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView as Base } from 'react-native-keyboard-aware-scroll-view'

import { KeyboardAwareScrollView } from '../index'

describe('KeyboardAwareScrollView', () => {
  test('subscribes to keyboard events onmount', () => {
    jest.spyOn(Keyboard, 'addListener')

    const wrapper = shallow(<KeyboardAwareScrollView />)
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

  test('keyboardDidShow sets state to keyboardOpen: true', () => {
    const wrapper = shallow(<KeyboardAwareScrollView />)
    wrapper.instance().keyboardDidShow()
    expect(wrapper.state().keyboardOpen).toEqual(true)
    expect(wrapper.find(Base).props().contentContainerStyle).toEqual({})
  })

  test('keyboardDidHide sets state to keyboardOpen: false', () => {
    const wrapper = shallow(<KeyboardAwareScrollView />)
    wrapper.setState({ keyboardOpen: true })
    wrapper.instance().keyboardDidHide()
    expect(wrapper.state().keyboardOpen).toEqual(false)
  })

  test('keyboardDidHide with stretchToHeightOfScreen sets container style to flex', () => {
    const wrapper = shallow(<KeyboardAwareScrollView stretchToHeightOfScreen />)
    wrapper.setState({ keyboardOpen: true })
    wrapper.instance().keyboardDidHide()
    expect(wrapper.state().keyboardOpen).toEqual(false)
    expect(wrapper.find(Base).props().contentContainerStyle).toEqual({
      flex: 1
    })
  })
})
