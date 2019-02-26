import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty array', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issues: [],
      currentIssueNumber: 0
    })
  })

  test('setIssues sets the array', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues([{ id: 1, number: 32 }])
    )
    const data = issues.selectors.getIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual([{ id: 1, number: 32 }])

    expect(
      issues.selectors.getCurrentIssueNumber({
        main: {
          issues: state
        }
      })
    ).toEqual(32)
  })

  test('it selects the latest 5 issues', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues([
        { id: 1, number: 32 },
        { id: 2, number: 33 },
        { id: 3, number: 34 },
        { id: 4, number: 35 },
        { id: 5, number: 36 },
        { id: 6, number: 37 }
      ])
    )

    const oldestIssue = state[state.length - 1]

    const data = issues.selectors.getLatestIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual(expect.not.arrayContaining([oldestIssue]))
  })
})
