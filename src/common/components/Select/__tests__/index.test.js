import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from 'react-native-element-dropdown'

import { Select } from '../index'

describe('Select', () => {
  const defaultProps = {
    items: [],
    label: 'Label',
    onValueChange: jest.fn(),
    value: 0,
  }

  test('renders', () => {
    const wrapper = shallow(<Select {...defaultProps} label='' />)
    expect(wrapper.find(Dropdown).length).toEqual(1)
  })
})
