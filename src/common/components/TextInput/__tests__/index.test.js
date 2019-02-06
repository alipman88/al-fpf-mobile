import React from 'react'
import { shallow } from 'enzyme'

import { TextInput } from '../index'
import { Error, Input } from '../styledComponents'

describe('TextInput', () => {
  const defaultProps = {
    label: 'field',
    onChangeText: jest.fn(),
    value: '',
    touched: false,
    error: ''
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
})
