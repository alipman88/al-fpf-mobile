import { currentUser } from '../currentUser'

describe('currentUser reducer', () => {
  test('initial state has a null access token', () => {
    const state = currentUser.reducer(undefined, {})
    expect(state).toEqual({
      accessToken: null
    })
  })
})
