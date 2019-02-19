import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty array', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issues: [],
      currentIssueId: 0
    })
  })

  test('setIssues sets the array', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues([{ id: 1 }])
    )
    const data = issues.selectors.getIssues({
      main: {
        issues: state
      }
    })

    expect(data).toEqual([{ id: 1 }])

    expect(
      issues.selectors.getCurrentIssueId({
        main: {
          issues: state
        }
      })
    ).toEqual(1)
  })
})
