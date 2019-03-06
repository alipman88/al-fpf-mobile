import { createSlice, createSelector } from 'redux-starter-kit'
import keyBy from 'lodash/keyBy'

import { resetAction } from '@common/resetAction'

const initialState = {
  issuesByAreaId: {},
  currentIssueId: 0
}

export const issues = createSlice({
  slice: 'issues',
  initialState: {
    ...initialState
  },
  reducers: {
    setCurrentIssueId: (state, action) => {
      return {
        ...state,
        currentIssueId: action.payload
      }
    },
    setIssues: (state, { payload: { issues, areaId } }) => {
      const currentIssueId = state.currentIssueId || issues[0].id
      const existingIssues = state.issuesByAreaId[areaId] || []
      const existingIssueIds = keyBy(existingIssues, 'id')
      return {
        ...state,
        issuesByAreaId: {
          ...state.issuesByAreaId,
          [areaId]: existingIssues.concat(
            issues.filter(issue => !existingIssueIds[issue.id])
          )
        },
        currentIssueId
      }
    }
  },
  extraReducers: {
    [resetAction]: () => ({ ...initialState })
  }
})

const path = 'main.issues'

const getIssuesForArea = (state, areaId) => {
  const issuesByAreaId = issues.selectors.getIssues(state)
  return issuesByAreaId[areaId] || []
}

const getLatestIssues = (state, areaId) => {
  return getIssuesForArea(state, areaId).slice(0, 5)
}

issues.selectors = {
  ...issues.selectors,
  getIssues: createSelector(
    [path],
    issues => issues.issuesByAreaId
  ),
  getCurrentIssueId: createSelector(
    [path],
    issues => issues.currentIssueId
  ),
  getLatestIssues,
  getIssuesForArea
}
