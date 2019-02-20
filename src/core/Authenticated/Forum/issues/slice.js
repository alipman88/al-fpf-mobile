import { createSlice, createSelector } from 'redux-starter-kit'

export const issues = createSlice({
  slice: 'issues',
  initialState: {
    issues: [],
    currentIssueNumber: 0
  },
  reducers: {
    setIssues: (state, action) => {
      const currentIssueNumber =
        state.currentIssueNumber || action.payload[0].number
      return {
        ...state,
        issues: action.payload,
        currentIssueNumber
      }
    }
  }
})

const path = 'main.issues'

issues.selectors = {
  ...issues.selectors,
  getIssues: createSelector(
    [path],
    issues => issues.issues
  ),
  getCurrentIssueNumber: createSelector(
    [path],
    issues => issues.currentIssueNumber
  )
}
