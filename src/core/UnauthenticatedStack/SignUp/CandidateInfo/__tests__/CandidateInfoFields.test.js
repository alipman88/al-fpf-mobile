import React from 'react'
import { shallow } from 'enzyme'
import { CandidateInfoFields } from '../CandidateInfoFields'

import { TextInput } from '@components/TextInput'

describe('CandidateInfoFields', () => {
  const defaultProps = {
    errors: {},
    handleSubmit: jest.fn(),
    navigation: {},
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {
      name: '',
      title: '',
      jurisdiction: '',
      notes: '',
    },
  }

  afterEach(() => {
    defaultProps.handleSubmit.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  test('changing campaign calls handlers', () => {
    const wrapper = shallow(<CandidateInfoFields {...defaultProps} />)

    wrapper.find(TextInput).at(0).simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('name')
  })

  test('changing office calls handlers', () => {
    const wrapper = shallow(<CandidateInfoFields {...defaultProps} />)

    wrapper.find(TextInput).at(1).simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('title')
  })

  test('changing jurisdiction calls handlers', () => {
    const wrapper = shallow(<CandidateInfoFields {...defaultProps} />)

    wrapper.find(TextInput).at(2).simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('jurisdiction')
  })

  test('changing tell us more calls handlers', () => {
    const wrapper = shallow(<CandidateInfoFields {...defaultProps} />)

    wrapper.find(TextInput).at(3).simulate('changeText', 'hi')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('notes')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('notes', 'hi')
  })
})
