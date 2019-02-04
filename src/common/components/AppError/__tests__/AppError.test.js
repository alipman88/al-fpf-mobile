import React from 'react'
import { FlashMessageManager } from 'react-native-flash-message'
import { shallow } from 'enzyme'

import { AppError } from '../AppError'

describe('AppError', () => {
  it('calls appropriate handlers error change', () => {
    const fake = {
      showMessage: jest.fn(),
      hideMessage: jest.fn()
    }
    jest.spyOn(FlashMessageManager, 'getDefault').mockImplementation(() => fake)
    const wrapper = shallow(<AppError setAppError={jest.fn()} error='' />)
    wrapper.setProps({ error: 'Doh!' })
    expect(fake.showMessage).toHaveBeenCalledWith({
      message: 'Doh!',
      type: 'danger'
    })

    wrapper.setProps({ error: '' })
    expect(fake.hideMessage).toHaveBeenCalled()
  })
})
