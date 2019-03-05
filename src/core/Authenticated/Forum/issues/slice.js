import { createSlice, createSelector } from 'redux-starter-kit'
import { resetAction } from '@common/resetAction'

const initialState = {
  issues: [],
  currentIssueNumber: 0
}

export const issues = createSlice({
  slice: 'issues',
  initialState: {
    ...initialState
  },
  reducers: {
    setCurrentIssueNumber: (state, action) => {
      return {
        ...state,
        currentIssueNumber: action.payload
      }
    },
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
    [resetAction]: () => ({ ...initialState })
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
