import { createSlice, createSelector } from 'redux-starter-kit'
import { getTime } from 'date-fns'
import keyBy from 'lodash/keyBy'

import { resetAction } from '@common/resetAction'

const initialState = {
  currentIssueId: 0,
  firstLoadOfIssues: null,
  loading: false
}

export const issues = createSlice({
  slice: 'issues',
  initialState: {
    ...initialState,
    issuesByAreaId: {}
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload
    }),
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
    setFirstLoadOfIssues: state => {
      return {
        ...state,
        firstLoadOfIssues: new Date()
      }
    },
    setIssues: (state, { payload: { issues, areaId } }) => {
      const currentIssueId = state.currentIssueId || issues[0].id
      const existingIssues = state.issuesByAreaId[areaId] || []
      const existingIssueIds = keyBy(existingIssues, 'id')

      let newIssues = issues
        .filter(issue => !existingIssueIds[issue.id])
        .map(issue => {
          issue.isUnread =
            getTime(state.firstLoadOfIssues) < getTime(new Date(issue.sent_at))
          return issue
        })

      newIssues = [...newIssues, ...existingIssues]
      newIssues = newIssues.sort((a, b) => {
        return b.number - a.number
      })
      newIssues = newIssues.slice(0, 30)

      return {
        ...state,
        issuesByAreaId: {
          ...state.issuesByAreaId,
          [areaId]: newIssues
        },
        currentIssueId,
        loading: false
      }
    },
    setIssue: (state, { payload: { issue, areaId } }) => {
      const currentIssueId = state.currentIssueId || issue.id
      let existingIssues = state.issuesByAreaId[areaId] || []
      const existingIssueIds = keyBy(existingIssues, 'id')
      if (!existingIssueIds[issue.id]) {
        issue.isUnread = true
        existingIssues = existingIssues.concat([issue]).sort((a, b) => {
          return b.number - a.number
        })
      }

      return {
        ...state,
        issuesByAreaId: {
          ...state.issuesByAreaId,
          [areaId]: existingIssues
        },
        currentIssueId,
        loading: false
      }
    }
  },
  extraReducers: {
    [resetAction]: () => ({ ...initialState, issuesByAreaId: {} })
  }
})

const path = 'main.issues'

const getIssuesForArea = (state, areaId) => {
  const issuesByAreaId = issues.selectors.getIssues(state)
  return issuesByAreaId[areaId] || []
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
  getLoading: createSelector(
    [path],
    issues => issues.loading
  ),
  getIssuesForArea
}
