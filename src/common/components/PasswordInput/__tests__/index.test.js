import React from 'react'
import { PasswordInput } from '@components/PasswordInput'
import { TextInput } from '@components/TextInput'
import { shallow } from 'enzyme'

describe('PasswordInput', () => {
  const defaultProps = {
    error: '',
    value: '',
    touched: false,
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn()
  }

  afterEach(() => {
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  test('setFieldTouched called onBlur', () => {
    const wrapper = shallow(<PasswordInput {...defaultProps} />)

    wrapper
      .find(TextInput)
      .first()
      .simulate('blur')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('password')
  })

  test('setFieldValue called onChangeText', () => {
    const wrapper = shallow(<PasswordInput {...defaultProps} />)
    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'value')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('password', 'value')
  })

  test('toggleShowPassword toggles showPassword', () => {
    const wrapper = shallow(<PasswordInput {...defaultProps} />)
    wrapper.setState({ showPassword: false })
    wrapper.instance().toggleShowPassword()
    expect(wrapper.state().showPassword).toEqual(true)
  })
})
