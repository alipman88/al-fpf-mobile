import { createSlice, createSelector } from 'redux-starter-kit'

export const issues = createSlice({
  slice: 'issues',
  initialState: {
    issues: [],
    currentIssueId: 0
  },
  reducers: {
    setIssues: (state, action) => {
      const currentIssueId = state.currentIssueId || action.payload[0].id
      return {
        ...state,
        issues: action.payload,
        currentIssueId
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
  getCurrentIssueId: createSelector(
    [path],
    issues => issues.currentIssueId
  )
}
