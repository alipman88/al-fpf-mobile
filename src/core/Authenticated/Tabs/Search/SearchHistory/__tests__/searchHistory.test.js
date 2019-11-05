import { resetAction } from '@common/resetAction'
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
        searchHistory.actions.addSearchToHistory({ keyword: 'Term 1' })
      )

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual([{ keyword: 'Term 1' }])

      for (let i = 2; i < 7; i++) {
        state = searchHistory.reducer(
          state,
          searchHistory.actions.addSearchToHistory({ keyword: `Term ${i}` })
        )
      }

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual([
        { keyword: 'Term 6' },
        { keyword: 'Term 5' },
        { keyword: 'Term 4' },
        { keyword: 'Term 3' },
        { keyword: 'Term 2' }
      ])

      state = searchHistory.reducer(
        state,
        searchHistory.actions.addSearchToHistory({
          keyword: 'Term 3'
        })
      )

      expect(
        searchHistory.selectors.getHistory(wrapStateToMain(state))
      ).toEqual([
        { keyword: 'Term 3' },
        { keyword: 'Term 6' },
        { keyword: 'Term 5' },
        { keyword: 'Term 4' },
        { keyword: 'Term 2' }
      ])
    })
  })

  describe('resetData', () => {
    test('empties the history', () => {
      let state = searchHistory.reducer(
        undefined,
        searchHistory.actions.addSearchToHistory({ keyword: 'hi' })
      )

      expect(state).toEqual({
        history: [{ keyword: 'hi' }]
      })

      state = searchHistory.reducer(state, resetAction())

      expect(state).toEqual({
        history: []
      })
    })
  })
})
