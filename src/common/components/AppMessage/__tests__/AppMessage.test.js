import React from 'react'
import * as flashMessage from 'react-native-flash-message'
import { shallow } from 'enzyme'

import { AppMessage } from '../AppMessage'

// Fix spying on exported module function
// https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-968853688
jest.mock('react-native-flash-message', () => ({
  __esModule: true,
  ...jest.requireActual('react-native-flash-message'),
}))

describe('AppMessage', () => {
  it('calls appropriate handlers error change', () => {
    const showMessageMock = jest.spyOn(flashMessage, 'showMessage')
    const hideMessageMock = jest.spyOn(flashMessage, 'hideMessage')

    const wrapper = shallow(
      <AppMessage setAppError={jest.fn()} message='' type='' />
    )
    wrapper.setProps({ message: 'Doh!', type: 'danger' })
    expect(showMessageMock).toHaveBeenCalledWith({
      message: 'Doh!',
      type: 'danger',
    })

    wrapper.setProps({ message: '' })
    expect(hideMessageMock).toHaveBeenCalled()
  })
})
