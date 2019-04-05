import React from 'react'
import { shallow } from 'enzyme'

import { KeyboardOpen } from '@components/KeyboardOpen'
import { KeyboardAwareScrollView } from '../index'

describe('KeyboardAwareScrollView', () => {
  test('keyboard closed with stretchToHeightOfScreen sets container style to flex', () => {
    let wrapper = shallow(<KeyboardAwareScrollView stretchToHeightOfScreen />)
    wrapper = shallow(
      wrapper.find(KeyboardOpen).prop('render')({
        open: false
      })
    )
    expect(wrapper.props().contentContainerStyle).toEqual({
      flex: 1
    })
  })
})
