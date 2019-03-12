import { searchHistory } from '../slice'

describe('searchHistory', () => {
  test('initial state contains empty array', () => {
    const state = searchHistory.reducer(undefined, {})
    expect(state).toEqual({ history: [] })
  })

  describe('addSearchToHistory', () => {
    const wrapStateToMain = state => ({ main: { searchHistory: state } })

    test('appending entries adds to front of the array, limiting to 5', () => {
      let state = searchHistory.reducer(
        undefined,
        searchHistory.actions.addSearchToHistory('Term 1')
      )

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual(['Term 1'])

      for (let i = 2; i < 7; i++) {
        state = searchHistory.reducer(
          state,
          searchHistory.actions.addSearchToHistory(`Term ${i}`)
        )
      }

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual(['Term 6', 'Term 5', 'Term 4', 'Term 3', 'Term 2'])

      state = searchHistory.reducer(
        state,
        searchHistory.actions.addSearchToHistory('Term 3')
      )

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual(['Term 3', 'Term 6', 'Term 5', 'Term 4', 'Term 2'])
    })
  })
})
