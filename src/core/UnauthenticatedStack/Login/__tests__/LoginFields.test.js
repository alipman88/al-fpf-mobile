import React from 'react'
import { shallow } from 'enzyme'
import { LoginFields } from '../LoginFields'
import { TextInput } from '@components/TextInput'
import { Button } from '@components/Button'

describe('LoginFields', () => {
  const defaultProps = {
    errors: {},
    handleSubmit: jest.fn(),
    isSubmitting: false,
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {}
  }

  afterEach(() => {
    defaultProps.handleSubmit.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  test('setFieldTouched called onBlur', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper
      .find(TextInput)
      .first()
      .simulate('blur')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('email')

    wrapper
      .find(TextInput)
      .at(1)
      .simulate('blur')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('password')
  })

  test('setFieldValue called onChangeText', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'value')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('email', 'value')

    wrapper
      .find(TextInput)
      .at(1)
      .simulate('changeText', 'pass')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('password', 'pass')
  })

  test('submit button calls handleSubmit', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper.find(Button).simulate('press')

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })
})
