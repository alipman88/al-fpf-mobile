import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty object', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issuesByAreaId: {},
      currentIssueId: 0,
      firstLoadOfIssues: true
    })
  })

  test('setIssues sets the object', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [{ id: 1, number: 32 }],
        areaId: 5
      })
    )
    const data = issues.selectors.getIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual({ 5: [{ id: 1, number: 32, isUnread: false }] })

    expect(
      issues.selectors.getCurrentIssueId({
        main: {
          issues: state
        }
      })
    ).toEqual(1)
  })

  test('setIssue sets new posts to not Unread on first load', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [
          { id: 1, number: 11 },
          { id: 2, number: 22 },
          { id: 3, number: 33 }
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
        ],
        firstLoadOfIssues: false
      }
    }
    const state = issues.reducer(
      initialState,
      issues.actions.setIssues({
        issues: [{ id: 4, number: 44 }],
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
  })

  test('it selects the latest 5 issues', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [
          { id: 1, number: 32 },
          { id: 2, number: 33 },
          { id: 3, number: 34 },
          { id: 4, number: 35 },
          { id: 5, number: 36 },
          { id: 6, number: 37 }
        ],
        areaId: 5
      })
    )

    const oldestIssue =
      state.issuesByAreaId[5][state.issuesByAreaId[5].length - 1]

    const data = issues.selectors.getLatestIssues(
      {
        main: {
          issues: state
        }
      },
      5
    )

    expect(oldestIssue.id).toEqual(6)
    expect(data).toEqual(expect.not.arrayContaining([oldestIssue]))
  })
})
