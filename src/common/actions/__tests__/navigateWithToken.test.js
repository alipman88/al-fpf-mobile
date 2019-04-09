import * as api from '@common/api'
import { Linking } from 'react-native'
import { navigateWithToken } from '../navigateWithToken'
import { appMessage } from '@components/AppMessage/slice'

describe('navigateWithToken', () => {
  test('gets the token, and directs the user', async () => {
    const apiSpy = jest.spyOn(api, 'postAuthorized').mockImplementation(() => ({
      data: {
        token: 'abc123'
      }
    }))

    const openUrlSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => {})

    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({})
    const setLoading = jest.fn()

    await navigateWithToken('/path?test=true', setLoading)(dispatch, getState)

    expect(dispatch).not.toHaveBeenCalled()

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(apiSpy).toHaveBeenCalledWith('/get_login_token', {}, {})
    expect(getState).toHaveBeenCalled()

    expect(openUrlSpy).toHaveBeenCalledWith(
      'https://frontporchforum.com/path?test=true&temporary_login_token=abc123'
    )
    expect(setLoading).toHaveBeenCalledWith(false)

    apiSpy.mockRestore()
    openUrlSpy.mockRestore()
  })

  test('dispatches app error when API fails', async () => {
    const apiSpy = jest.spyOn(api, 'postAuthorized').mockImplementation(() => {
      throw new Error('boom')
    })

    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({})
    const setLoading = jest.fn()
    await navigateWithToken('https://something.com?test=true', setLoading)(
      dispatch,
      getState
    )

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(apiSpy).toHaveBeenCalledWith('/get_login_token', {}, {})
    expect(setLoading).toHaveBeenCalledWith(false)

    expect(dispatch).toHaveBeenCalledWith(
      appMessage.actions.setAppError('boom')
    )

    apiSpy.mockRestore()
  })
})
