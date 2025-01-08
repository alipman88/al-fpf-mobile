import React from 'react'
import { shallow } from 'enzyme'

import { Select } from '../index'
import { FormFieldLabel } from '@fpf/components/FormFieldLabel'

describe('Select', () => {
  const defaultProps = {
    items: [],
    label: 'Label',
    onValueChange: jest.fn(),
    placeholder: 'select',
    title: 'Select Things',
    value: 0,
  }

  test('no FormFieldLabel if theres no label', () => {
    const wrapper = shallow(<Select {...defaultProps} label='' />)
    expect(wrapper.find(FormFieldLabel).length).toEqual(0)
  })
})
