import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty array', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issuesByAreaId: {},
      currentIssueId: 0
    })
  })

  test('setIssues sets the array', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({ issues: [{ id: 1, number: 32 }], areaId: 5 })
    )
    const data = issues.selectors.getIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual({ 5: [{ id: 1, number: 32 }] })

    expect(
      issues.selectors.getCurrentIssueId({
        main: {
          issues: state
        }
      })
    ).toEqual(1)
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
