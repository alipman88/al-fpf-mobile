import React from 'react'
import { shallow } from 'enzyme'
import { SplashScreen } from '../SplashScreen'

describe('SplashScreen', () => {
  const defaultProps = {
    accessToken: '',
    navigation: {
      navigate: jest.fn()
    }
  }

  afterEach(() => {
    defaultProps.navigation.navigate.mockReset()
  })

  test('navigates to UnauthenticatedStack', () => {
    const wrapper = shallow(<SplashScreen {...defaultProps} />)
    wrapper.instance().componentDidMount()

    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(
      'UnauthenticatedStack'
    )
  })

  test('navigates to AuthenticatedStack', () => {
    const wrapper = shallow(
      <SplashScreen {...defaultProps} accessToken='abc' />
    )
    wrapper.instance().componentDidMount()

    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(
      'AuthenticatedStack'
    )
  })
})
