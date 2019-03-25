import { createSlice, createSelector } from 'redux-starter-kit'

export const welcome = createSlice({
  initialState: {
    shouldDisplay: true
  },
  reducers: {
    setShouldDisplay: (_, action) => ({
      shouldDisplay: action.payload
    })
  }
})

welcome.selectors = {
  ...welcome.selectors,
  getShouldDisplay: createSelector(
    ['main.welcome'],
    welcome => welcome.shouldDisplay
  )
}
