import React from 'react'
import { Platform } from 'react-native'
import { shallow } from 'enzyme'

import { KeyboardOpen } from '@fpf/components/KeyboardOpen'
import { KeyboardAwareScrollView } from '../index'

describe('KeyboardAwareScrollView', () => {
  test('keyboard closed with stretchToHeightOfScreen sets container style to flex', () => {
    let wrapper = shallow(<KeyboardAwareScrollView stretchToHeightOfScreen />)
    wrapper = shallow(
      wrapper.find(KeyboardOpen).prop('render')({
        open: false,
      }),
    )

    let expectedStyle = null
    if (Platform.OS === 'android') {
      expectedStyle = [{ flex: 1 }, { paddingBottom: 0 }]
    } else {
      expectedStyle = { flex: 1 }
    }

    expect(wrapper.props().contentContainerStyle).toEqual(expectedStyle)
  })
})
