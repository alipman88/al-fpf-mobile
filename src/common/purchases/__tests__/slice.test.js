import { purchases } from '../slice'

describe('purchases - slice', () => {
  test('initialState', () => {
    const state = purchases.reducer(undefined, {})
    expect(state).toEqual({
      profileId: undefined,
      purchasing: false
    })
  })

  test('set and get purchasing and profile id state', () => {
    let state = purchases.reducer(
      undefined,
      purchases.actions.setPurchasing({ profileId: 1 })
    )

    let appState = { main: { purchases: state } }
    expect(purchases.selectors.getPurchasing(appState)).toEqual(true)
    expect(purchases.selectors.getProfileId(appState)).toEqual(1)

    state = purchases.reducer(undefined, purchases.actions.setPurchasing(false))

    appState = { main: { purchases: state } }
    expect(purchases.selectors.getPurchasing(appState)).toEqual(false)
    expect(purchases.selectors.getProfileId(appState)).toEqual(undefined)
  })
})
