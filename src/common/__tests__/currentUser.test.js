import { currentUser } from '../currentUser'

describe('currentUser reducer', () => {
  test('initial state has a null access token', () => {
    const state = currentUser.reducer(undefined, {})
    expect(state).toEqual({
      accessToken: null
    })
  })

  test('setAccessToken sets the token', () => {
    const state = {
      secured: {
        currentUser: currentUser.reducer(
          undefined,
          currentUser.actions.setAccessToken('token')
        )
      }
    }

    expect(currentUser.selectors.getAccessToken(state)).toEqual('token')
  })
})
