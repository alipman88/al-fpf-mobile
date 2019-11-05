import { createSelector, createSlice } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

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
        state.history
          .filter(entry => entry.keyword !== payload.keyword)
          .slice(0, 4)
      )
    })
  },
  extraReducers: {
    [resetAction]: () => ({
      history: []
    })
  }
})

searchHistory.selectors = {
  getHistory: createSelector(
    ['main.searchHistory'],
    searchHistory => searchHistory.history
  )
}
