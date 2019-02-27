import React from 'react'
import { shallow } from 'enzyme'

import { Select } from '../index'
import { SelectButton } from '../styledComponents'

describe('Select', () => {
  const defaultProps = {
    items: [],
    label: 'Label',
    onValueChange: jest.fn(),
    placeholder: 'select',
    title: 'Select Things',
    value: 0
  }

  test('SelectButton press calls ref', () => {
    const wrapper = shallow(<Select {...defaultProps} />)
    // This is pretty hacky, but I tried mount rendering to get the ref, but it led to other problems
    // Because it's a sub component, the ref wont get set by the modal component in shallow rendering
    // So we just set the prototype to watch it instead.
    Select.prototype.selectModuleRef = {
      show: jest.fn()
    }
    wrapper.find(SelectButton).simulate('press')
    expect(Select.prototype.selectModuleRef.show).toHaveBeenCalled()
    delete Select.prototype.selectModuleRef
  })
})
