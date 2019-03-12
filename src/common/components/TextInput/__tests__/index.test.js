import React from 'react'
import { shallow } from 'enzyme'
import { TouchableWithoutFeedback } from 'react-native'

import { TextInput } from '../index'
import { FormError } from '@components/FormError'
import { FormFieldLabel } from '@components/FormFieldLabel'
import { Input } from '../styledComponents'

const TestIcon = () => null

describe('TextInput', () => {
  const defaultProps = {
    label: 'field',
    onChangeText: jest.fn(),
    value: '',
    touched: false,
    error: '',
    onTapIcon: jest.fn()
  }

  test('input calls onChangeText', () => {
    const wrapper = shallow(<TextInput {...defaultProps} />)
    wrapper.find(Input).simulate('changeText', 'hello!')
    expect(defaultProps.onChangeText).toHaveBeenCalledWith('hello!')
    expect(wrapper.find(FormFieldLabel).length).toEqual(1)
  })

  test('touched && error renders the error text', () => {
    const wrapper = shallow(
      <TextInput {...defaultProps} touched error='Some error' />
    )

    expect(wrapper.find(FormError).length).toEqual(1)
  })

  test('it shows an Icon if theres an iconSrc', () => {
    const wrapper = shallow(
      <TextInput {...defaultProps} tapIcon={<TestIcon />} />
    )
    expect(wrapper.find(TestIcon).length).toEqual(1)
  })

  test('callback called on Icon tap', () => {
    const wrapper = shallow(
      <TextInput {...defaultProps} tapIcon={<TestIcon />} />
    )
    wrapper
      .find(TouchableWithoutFeedback)
      .first()
      .simulate('press')
    expect(defaultProps.onTapIcon).toBeCalled()
  })

  test('no label removes FormFieldLabel', () => {
    const wrapper = shallow(<TextInput {...defaultProps} label='' />)
    expect(wrapper.find(FormFieldLabel).length).toEqual(0)
  })
})
