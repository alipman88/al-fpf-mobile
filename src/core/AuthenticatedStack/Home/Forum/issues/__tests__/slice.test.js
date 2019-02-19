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
})
