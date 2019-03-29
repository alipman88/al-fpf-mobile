import React from 'react'
import { shallow } from 'enzyme'
import { GovernmentInfoFields } from '../GovernmentInfoFields'

import { TextInput } from '@components/TextInput'

describe('GovernmentInfoFields', () => {
  const defaultProps = {
    errors: {},
    handleSubmit: jest.fn(),
    navigation: {},
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

  test('changing title calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('title')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('title', 'hi')
  })

  test('changing jurisdiction calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .at(1)
      .simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('jurisdiction')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith(
      'jurisdiction',
      'hi'
    )
  })

  test('changing tell us more calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .at(2)
      .simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('tellUsMore')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('tellUsMore', 'hi')
  })
})
