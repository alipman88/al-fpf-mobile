import React from 'react'
import { shallow } from 'enzyme'
import { Forum } from '../Forum'

describe('Forum', () => {
  const defaultProps = {
    getAreas: jest.fn(),
    navigation: {},
    setAccessToken: jest.fn()
  }

  afterEach(() => {
    defaultProps.getAreas.mockReset()
    defaultProps.setAccessToken.mockReset()
  })

  test('calls getAreas on mount', () => {
    shallow(<Forum {...defaultProps} />)

    expect(defaultProps.getAreas).toHaveBeenCalled()
  })
})
