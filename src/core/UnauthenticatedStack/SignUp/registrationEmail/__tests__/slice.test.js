import { registrationEmail } from '../slice'

describe('registrationEmail - slice', () => {
  test('setRegistrationEmail sets email', () => {
    const initialState = {
      email: '',
    }

    const payload = 'bar@foo.com'
    const state = registrationEmail.reducer(
      initialState,
      registrationEmail.actions.setRegistrationEmail(payload),
    )

    const data = registrationEmail.selectors.getRegistrationEmail({
      main: { registrationEmail: state },
    })
    expect(data).toEqual('bar@foo.com')
  })
})
