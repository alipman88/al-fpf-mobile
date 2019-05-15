import React from 'react'
import { shallow } from 'enzyme'

import { OcmMessage } from '../OcmMessage'
import { OcmMessageText } from '../styledComponents'

describe('OcmMessage', () => {
  test('if message has empty length, component should render null', () => {
    const wrapper = shallow(<OcmMessage ocmMessage={''} />)

    expect(wrapper.type()).toEqual(null)
  })

  test('renders with a string', () => {
    const wrapper = shallow(<OcmMessage ocmMessage={'foo'} />)

    expect(wrapper.type()).toEqual(OcmMessageText)
  })
})
