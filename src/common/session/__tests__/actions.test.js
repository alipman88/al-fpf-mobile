import * as api from '@common/api'
import { currentUser } from '@common/currentUser'
import { login, sendDeviceData } from '../actions'

describe('session actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123',
        fcmToken: 'fcm-123',
      },
    },
  })

  test('requests /login', async () => {
    const postSpy = jest.spyOn(api.api, 'post').mockImplementation(() => ({
      data: {
        access_token: 'token abc',
        token_type: 'Bearer',
      },
    }))
    const dispatch = jest.fn()

    await login()(dispatch, getState)

    expect(postSpy).toHaveBeenCalledWith('/login', {
      os: 'ios',
      device_name: 'Apple iPhone X',
      device_id: '123abc',
      fcm_token: 'fcm-123',
    })

    expect(dispatch).toHaveBeenCalledWith(
      currentUser.actions.setAccessToken('token abc'),
    )

    postSpy.mockRestore()
  })

  test('requests /app_sessions', async () => {
    const postSpy = jest
      .spyOn(api, 'postAuthorized')
      .mockImplementation(() => {})
    const dispatch = jest.fn()

    await sendDeviceData()(dispatch, getState)

    expect(postSpy).toHaveBeenCalledWith(
      '/app_sessions',
      {
        os: 'ios',
        device_name: 'Apple iPhone X',
        device_id: '123abc',
        fcm_token: 'fcm-123',
      },
      {
        secured: {
          currentUser: { accessToken: 'abc123', fcmToken: 'fcm-123' },
        },
      },
    )

    postSpy.mockRestore()
  })
})
