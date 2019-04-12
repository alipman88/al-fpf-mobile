import * as api from '@common/api'
import { Linking } from 'react-native'
import { navigateWithToken } from '../navigateWithToken'
import { appMessage } from '@components/AppMessage/slice'
import { spinner } from '@app/Spinner/slice'

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

    await navigateWithToken('/path?test=true')(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(true))

    expect(apiSpy).toHaveBeenCalledWith('/get_login_token', {}, {})
    expect(getState).toHaveBeenCalled()

    expect(openUrlSpy).toHaveBeenCalledWith(
      'https://frontporchforum.com/path?test=true&temporary_login_token=abc123'
    )
    expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(false))

    apiSpy.mockRestore()
    openUrlSpy.mockRestore()
  })

  test('dispatches app error when API fails', async () => {
    const apiSpy = jest.spyOn(api, 'postAuthorized').mockImplementation(() => {
      throw new Error('boom')
    })

    const dispatch = jest.fn()
    const getState = jest.fn().mockReturnValue({})
    await navigateWithToken('https://something.com?test=true')(
      dispatch,
      getState
    )

    expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(true))
    expect(apiSpy).toHaveBeenCalledWith('/get_login_token', {}, {})
    expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(false))

    expect(dispatch).toHaveBeenCalledWith(
      appMessage.actions.setAppError('boom')
    )

    apiSpy.mockRestore()
  })
})
