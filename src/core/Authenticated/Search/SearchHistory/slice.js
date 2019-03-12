import { createSelector, createSlice } from 'redux-starter-kit'

export const searchHistory = createSlice({
  name: 'searchHistory',
  initialState: {
    history: []
  },
  reducers: {
    addSearchToHistory: (state, { payload }) => ({
      ...state,
      history: [payload].concat(
        // filter out previous entries of the same value
        state.history.filter(entry => entry !== payload).slice(0, 4)
      )
    })
  }
})

searchHistory.selectors = {
  getHistory: createSelector(
    ['main.searchHistory'],
    searchHistory => searchHistory.history
  )
}
