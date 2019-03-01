import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

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
  },
  extraReducers: {
    [resetAction]: () => ({ issues: [], currentIssueNumber: 0 })
  }
})

const path = 'main.issues'

issues.selectors = {
  ...issues.selectors,
  getLatestIssues: createSelector(
    [path],
    issues => issues.issues.slice(0, 5)
  ),
  getIssues: createSelector(
    [path],
    issues => issues.issues
  ),
  getCurrentIssueNumber: createSelector(
    [path],
    issues => issues.currentIssueNumber
  )
}
