import { currentUser } from '../currentUser'

describe('currentUser reducer', () => {
  test('initial state has an empty access token', () => {
    const state = currentUser.reducer(undefined, {})
    expect(state).toEqual({
      accessToken: ''
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
