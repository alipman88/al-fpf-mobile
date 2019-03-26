import { registrationEmail } from '../slice'

describe('registrationEmail - slice', () => {
  test('setRegistrationEmail sets email', () => {
    const initialState = {
      email: ''
    }

    const payload = { email: 'bar@foo.com' }
    const state = registrationEmail.reducer(
      initialState,
      registrationEmail.actions.setRegistrationEmail(payload)
    )

    const data = registrationEmail.selectors.getRegistrationEmail({
      main: { registrationEmail: state }
    })
    expect(data.email).toEqual('bar@foo.com')
  })
})
