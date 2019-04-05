import { subDays, addDays, endOfToday } from 'date-fns'
import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty object', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issuesByAreaId: {},
      currentIssueId: 0,
      firstLoadOfIssues: null,
      loading: false
    })
  })

  test('setLoading sets loading state', () => {
    const state = issues.reducer(
      { firstLoadOfIssues: new Date() },
      issues.actions.setLoading(true)
    )

    expect(
      issues.selectors.getLoading({
        main: {
          issues: state
        }
      })
    ).toEqual(true)
  })

  test('setIssues sets the object', () => {
    const date = new Date()
    const initialState = {
      firstLoadOfIssues: date,
      issuesByAreaId: {}
    }

    let state = issues.reducer(initialState, issues.actions.setLoading(true))

    state = issues.reducer(
      state,
      issues.actions.setIssues({
        issues: [{ id: 1, number: 32, sent_at: date }],
        areaId: 5
      })
    )

    const data = issues.selectors.getIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual({
      5: [{ id: 1, number: 32, isUnread: false, sent_at: date }]
    })

    expect(
      issues.selectors.getCurrentIssueId({
        main: {
          issues: state
        }
      })
    ).toEqual(1)

    expect(
      issues.selectors.getLoading({
        main: {
          issues: state
        }
      })
    ).toEqual(false)
  })

  test('setIssues sets new posts to not Unread on first load', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [
          { id: 1, number: 11, sent_at: subDays(endOfToday(), 11) },
          { id: 2, number: 22, sent_at: subDays(endOfToday(), 13) },
          { id: 3, number: 33, sent_at: subDays(endOfToday(), 16) }
        ],
        areaId: 9
      })
    )

    const data = issues.selectors.getIssuesForArea(
      {
        main: {
          issues: {
            ...state
          }
        }
      },
      9
    )

    for (let issue in data) {
      expect(issue.isUnread).toBeFalsy()
    }
  })

  test('it only sets unread on new issues', () => {
    const initialState = {
      issuesByAreaId: {
        3: [
          { id: 1, number: 11, isUnread: false },
          { id: 2, number: 22, isUnread: false },
          { id: 3, number: 33, isUnread: true }
        ]
      },
      firstLoadOfIssues: endOfToday()
    }
    const state = issues.reducer(
      initialState,
      issues.actions.setIssues({
        issues: [{ id: 4, number: 9, sent_at: addDays(endOfToday(), 1) }],
        areaId: 3
      })
    )

    const data = issues.selectors.getIssuesForArea(
      {
        main: {
          issues: {
            ...state
          }
        }
      },
      3
    )
    const newestIssue = data.find(i => i.id === 4)
    const previouslyUnread = data.find(i => i.id === 3)
    const alreadyRead = data.filter(i => !i.isUnread)

    expect(newestIssue.isUnread).toBeTruthy()
    expect(previouslyUnread.isUnread).toBeTruthy()

    for (let issue in alreadyRead) {
      expect(issue.isUnread).toBeFalsy()
    }

    expect(data.length).toEqual(4)
    // newest issue by number is first
    expect(data.map(post => post.id)).toEqual([3, 2, 1, 4])
  })

  test('it selects the latest 10 issues', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [
          { id: 1, number: 32 },
          { id: 2, number: 33 },
          { id: 3, number: 34 },
          { id: 4, number: 35 },
          { id: 5, number: 36 },
          { id: 6, number: 37 },
          { id: 7, number: 38 },
          { id: 8, number: 39 },
          { id: 9, number: 40 },
          { id: 10, number: 41 },
          { id: 11, number: 42 },
          { id: 12, number: 343 }
        ],
        areaId: 5
      })
    )

    const issue2 = state.issuesByAreaId[5][10]

    const data = issues.selectors.getLatestIssues(
      {
        main: {
          issues: state
        }
      },
      5
    )

    expect(issue2.id).toEqual(2)
    expect(data).toEqual(expect.not.arrayContaining([issue2]))
    expect(data.length).toEqual(10)
  })
})
