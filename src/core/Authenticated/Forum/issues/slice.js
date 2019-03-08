import { createSlice, createSelector } from 'redux-starter-kit'
import keyBy from 'lodash/keyBy'

import { resetAction } from '@common/resetAction'

const initialState = {
  issuesByAreaId: {},
  currentIssueId: 0,
  firstLoadOfIssues: true
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
    toggleIssueUnread: (state, action) => {
      const { id, isUnread, areaId } = action.payload
      const issues = state.issuesByAreaId[areaId].map(issue => {
        return issue.id === id ? { ...issue, isUnread: isUnread } : issue
      })
      return {
        ...state,
        issuesByAreaId: {
          ...state.issuesByAreaId,
          [areaId]: issues
        }
      }
    },
    setFirstLoadFalse: state => {
      return {
        ...state,
        firstLoadOfIssues: false
      }
    },
    setIssues: (state, { payload: { issues, areaId } }) => {
      const currentIssueId = state.currentIssueId || issues[0].id
      const existingIssues = state.issuesByAreaId[areaId] || []
      const existingIssueIds = keyBy(existingIssues, 'id')

      const newIssues = existingIssues.concat(
        issues
          .filter(issue => !existingIssueIds[issue.id])
          .map(issue => {
            issue.isUnread = !state.firstLoadOfIssues
            return issue
          })
      )
      return {
        ...state,
        issuesByAreaId: {
          ...state.issuesByAreaId,
          [areaId]: newIssues
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
  getFirstLoadIssues: createSelector(
    [path],
    issues => issues.firstLoadOfIssues
  ),
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
