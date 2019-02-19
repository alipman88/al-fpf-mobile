import React from 'react'
import { shallow } from 'enzyme'

import { TextInput } from '../index'
import { TouchableWithoutFeedback } from 'react-native'
import { Error, Input, Icon } from '../styledComponents'

describe('TextInput', () => {
  const defaultProps = {
    label: 'field',
    onChangeText: jest.fn(),
    value: '',
    touched: false,
    error: '',
    hasIcon: false,
    iconSrc: 0,
    onTapIcon: jest.fn()
  }

  test('input calls onChangeText', () => {
    const wrapper = shallow(<TextInput {...defaultProps} />)
    wrapper.find(Input).simulate('changeText', 'hello!')
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('hello!')
  })

  test('touched && error renders the error text', () => {
    const wrapper = shallow(
      <TextInput {...defaultProps} touched error='Some error' />
    )

    expect(wrapper.find(Error).length).toEqual(1)
  })

  test('it shows an Icon if hasIcon is true', () => {
    const wrapper = shallow(<TextInput {...defaultProps} hasIcon iconSrc={1} />)
    expect(wrapper.find(Icon).length).toEqual(1)
  })

  test('callback called on Icon tap', () => {
    const wrapper = shallow(<TextInput {...defaultProps} hasIcon iconSrc={1} />)
    wrapper
      .find(TouchableWithoutFeedback)
      .first()
      .simulate('press')
    expect(defaultProps.onTapIcon).toBeCalled()
  })
})
