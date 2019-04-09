import React from 'react'
import { FlashMessageManager } from 'react-native-flash-message'
import { shallow } from 'enzyme'

import { AppMessage } from '../AppMessage'

describe('AppMessage', () => {
  it('calls appropriate handlers error change', () => {
    const fake = {
      showMessage: jest.fn(),
      hideMessage: jest.fn()
    }
    jest.spyOn(FlashMessageManager, 'getDefault').mockImplementation(() => fake)
    const wrapper = shallow(<AppMessage setAppError={jest.fn()} message='' />)
    wrapper.setProps({ message: 'Doh!', type: 'danger' })
    expect(fake.showMessage).toHaveBeenCalledWith({
      message: 'Doh!',
      type: 'danger'
    })

    wrapper.setProps({ message: '' })
    expect(fake.hideMessage).toHaveBeenCalled()
  })
})
