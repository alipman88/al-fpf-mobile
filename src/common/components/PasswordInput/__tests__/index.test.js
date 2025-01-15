import React from 'react'
import { PasswordInput } from '@fpf/components/PasswordInput'
import { shallow } from 'enzyme'

describe('PasswordInput', () => {
  const defaultProps = {
    value: '',
  }

  test('toggleShowPassword toggles showPassword', () => {
    const wrapper = shallow(<PasswordInput {...defaultProps} />)
    wrapper.setState({ showPassword: false })
    wrapper.instance().toggleShowPassword()
    expect(wrapper.state().showPassword).toEqual(true)
  })
})
