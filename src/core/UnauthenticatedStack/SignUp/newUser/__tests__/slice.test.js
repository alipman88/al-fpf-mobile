import { newUser } from '../slice'

describe('newUser - slice', () => {
  test('setNewUserByKey sets new values to specified key', () => {
    const initialState = {
      profileType: 'neighbor',
      someArbitraryKey: 'Bugs Bunny'
    }

    const payload = { profileType: 'business' }
    const state = newUser.reducer(
      initialState,
      newUser.actions.setNewUserByKey(payload)
    )

    const data = newUser.selectors.getNewUser({ main: { newUser: state } })
    expect(data.profileType).toEqual('business')
    expect(data.someArbitraryKey).toEqual(initialState.someArbitraryKey)
  })
})
