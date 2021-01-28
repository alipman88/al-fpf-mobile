import { mailApp } from '../slice'

describe('mailApp - slice', () => {
  test('has correct default state', () => {
    const state = mailApp.reducer(undefined, {})
    expect(state).toEqual({
      app: null,
    })
  })

  test('setPreferredApp sets the app string', () => {
    const state = mailApp.reducer(
      undefined,
      mailApp.actions.setPreferredApp('mail')
    )

    expect(
      mailApp.selectors.getPreferredApp({
        main: {
          mailApp: state,
        },
      })
    ).toEqual('mail')
  })
})
