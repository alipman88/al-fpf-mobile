import { spinner } from '../slice'

describe('spinner - slice', () => {
  test('initial state has visibility = false', () => {
    const state = spinner.reducer(undefined, {})
    expect(state).toEqual({
      visible: false,
    })
  })

  describe('setVisibility', () => {
    test('changes the value in state', () => {
      const state = spinner.reducer(
        undefined,
        spinner.actions.setVisibility(true),
      )
      expect(state).toEqual({
        visible: true,
      })

      expect(
        spinner.selectors.getVisible({
          main: {
            spinner: state,
          },
        }),
      ).toEqual(true)
    })
  })
})
