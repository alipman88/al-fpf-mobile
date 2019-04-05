import { newUser } from '../slice'

describe('newUser - slice', () => {
  test('setNewUserByKey sets new values to specified key', () => {
    const initialState = {
      user: {
        firstName: '',
        someArbitraryKey: 'Bugs Bunny'
      }
    }

    const payload = { firstName: 'Salvador' }

    const state = newUser.reducer(
      initialState,
      newUser.actions.setNewUserByKey(payload)
    )

    const data = newUser.selectors.getNewUser({ main: { newUser: state } })
    expect(data.someArbitraryKey).toEqual(initialState.user.someArbitraryKey)
    expect(data.firstName).toEqual('Salvador')
  })

  it('nukes user data', () => {
    const state = newUser.reducer(undefined, newUser.actions.clearData())

    const data = newUser.selectors.getNewUser({ main: { newUser: state } })

    expect(data.email).toEqual('')
    expect(data.firstName).toEqual('')
  })
})
