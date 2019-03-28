import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { WaitlistSuccess } from '../index'
import { Close } from '../styledComponents'
import { createResetStackTo } from '@common/utils/navigation'

describe('WaitlistSuccess', () => {
  const defaultProps = {
    navigation: {
      dispatch: jest.fn()
    }
  }

  afterEach(() => {
    defaultProps.navigation.dispatch.mockRestore()
  })

  test('pressing close button triggers onClose prop', () => {
    const wrapper = shallow(<WaitlistSuccess {...defaultProps} />)
    wrapper.find(Close).simulate('press')
    expect(defaultProps.navigation.dispatch).toHaveBeenCalledWith(
      createResetStackTo('Login')
    )
  })

  test('pressing link button navigates', () => {
    const wrapper = shallow(<WaitlistSuccess {...defaultProps} />)
    wrapper.find(TouchableOpacity).simulate('press')
    expect(defaultProps.navigation.dispatch).toHaveBeenCalledWith(
      createResetStackTo('Login')
    )
  })
})
