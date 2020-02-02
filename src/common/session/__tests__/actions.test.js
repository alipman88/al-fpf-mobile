import firebase from 'react-native-firebase'

import { api } from '@common/api'
import { currentUser } from '@common/currentUser'
import { login } from '../actions'

describe('session actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    }
  })

  test('requests /login', async () => {
    const postSpy = jest.spyOn(api, 'post').mockImplementation(() => ({
      data: {
        access_token: 'token abc',
        token_type: 'Bearer'
      }
    }))
    const dispatch = jest.fn()

    await login()(dispatch, getState)

    expect(postSpy).toHaveBeenCalledWith('/login', {
      os: 'ios',
      device_name: 'Apple iPhone X',
      device_id: '123abc',
      fcm_token: undefined
    })

    expect(dispatch).toHaveBeenCalledWith(
      currentUser.actions.setAccessToken('token abc')
    )

    expect(
      firebase.analytics().setAnalyticsCollectionEnabled
    ).toHaveBeenCalledWith(true)

    postSpy.mockRestore()
  })
})
