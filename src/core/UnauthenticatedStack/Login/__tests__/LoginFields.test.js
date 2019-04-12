import React from 'react'
import { shallow } from 'enzyme'
import { LoginFields } from '../LoginFields'
import { BottomText } from '../styledComponents'
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
  })

  test('setFieldValue called onChangeText', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'value')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('email', 'value')
  })

  test('submit button calls handleSubmit', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper.find(Button).simulate('press')

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
  })

  test('shows error buttons', () => {
    const wrapper = shallow(<LoginFields {...defaultProps} />)
    wrapper.find(Button).simulate('press')

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
    expect(wrapper.find(BottomText).length).toEqual(1) // only 1 without error

    const error = {
      text: 'something went wrong',
      button: { text: 'fix it', url: 'some url' }
    }
    const wrapperWithError = shallow(
      <LoginFields {...defaultProps} errors={error} />
    )
    wrapperWithError.find(Button).simulate('press')

    expect(defaultProps.handleSubmit).toHaveBeenCalled()
    expect(wrapperWithError.find(BottomText).length).toEqual(2) // 2 with error
  })
})
