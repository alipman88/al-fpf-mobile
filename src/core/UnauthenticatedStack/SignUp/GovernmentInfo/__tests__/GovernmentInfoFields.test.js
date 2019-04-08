import React from 'react'
import { shallow } from 'enzyme'
import { GovernmentInfoFields } from '../GovernmentInfoFields'

import { TextInput } from '@components/TextInput'
import { Select } from '@components/Select'

describe('GovernmentInfoFields', () => {
  const defaultProps = {
    errors: {},
    handleSubmit: jest.fn(),
    navigation: {},
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {
      title: '',
      jurisdiction: '',
      tellUsMore: ''
    },
    governmentTitles: ['Mayor', 'Feudal Lord', 'Feudal Lady', 'Mr. Rogers']
  }

  afterEach(() => {
    defaultProps.handleSubmit.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  test('changing title calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    const select = wrapper.find(Select).first()
    select.props().onValueChange(() => 3)

    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('title')
  })

  test('changing jurisdiction calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .first()
      .simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('jurisdiction')
  })

  test('changing tell us more calls handlers', () => {
    const wrapper = shallow(<GovernmentInfoFields {...defaultProps} />)

    wrapper
      .find(TextInput)
      .at(1)
      .simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('tellUsMore')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('tellUsMore', 'hi')
  })
})
