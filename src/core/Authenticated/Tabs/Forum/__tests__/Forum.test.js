import React from 'react'
import { Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { shallow } from 'enzyme'
import { waitFor } from '@testing-library/react-native'

import { Forum } from '../Forum'

jest.mock('@react-navigation/native', () => ({
  useScrollToTop: jest.fn(),
}))

describe('Forum', () => {
  const defaultProps = {
    accessToken: 'abc',
    navigation: {
      navigate: jest.fn(),
      setParams: jest.fn(),
      setOptions: jest.fn(),
    },
    route: { params: {} },
    navigateWithToken: jest.fn(),
    fcmToken: '',
    sendNewFCMToken: jest.fn(),
  }

  afterEach(() => {
    defaultProps.sendNewFCMToken.mockReset()
    defaultProps.navigation.setParams.mockReset()
  })

  test('calls sendNewFCMToken when firebase returns a different token', async () => {
    shallow(<Forum {...defaultProps} />)
    await waitFor(() =>
      expect(defaultProps.sendNewFCMToken).toHaveBeenCalledWith('fcmToken'),
    )
  })

  test('sets up notification listeners', async () => {
    const wrapper = shallow(<Forum {...defaultProps} />)
    await wrapper.instance().componentDidMount()
    expect(messaging().onTokenRefresh).toHaveBeenCalled()
  })

  test('user has not given messaging permission, should ask firebase for it', async () => {
    const spy = jest.spyOn(messaging(), 'hasPermission').mockReturnValue(false)

    const wrapper = shallow(<Forum {...defaultProps} />)
    await wrapper.instance().componentDidMount()
    if (Platform.OS === 'ios') {
      await waitFor(() =>
        expect(messaging().requestPermission).toHaveBeenCalled(),
      )
    }

    spy.mockRestore()
  })
})
