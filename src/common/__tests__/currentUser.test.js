import { currentUser } from '../currentUser'

describe('currentUser reducer', () => {
  test('initial state has an empty access token', () => {
    const state = currentUser.reducer(undefined, {})
    expect(state).toEqual({
      accessToken: '',
      fcmToken: '',
    })
  })

  test('setAccessToken sets the token', () => {
    const state = {
      secured: {
        currentUser: currentUser.reducer(
          undefined,
          currentUser.actions.setAccessToken('token'),
        ),
      },
    }

    expect(currentUser.selectors.getAccessToken(state)).toEqual('token')
  })

  test('setFCMToken sets the token', () => {
    const state = {
      secured: {
        currentUser: currentUser.reducer(
          undefined,
          currentUser.actions.setFCMToken('token'),
        ),
      },
    }

    expect(currentUser.selectors.getFCMToken(state)).toEqual('token')
  })
})
