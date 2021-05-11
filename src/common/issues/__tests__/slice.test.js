import { subDays, addDays, endOfToday } from 'date-fns'
import range from 'lodash/range'
import { issues } from '../slice'

describe('issues - slice', () => {
  test('issues returns an empty object', () => {
    const data = issues.reducer(undefined, {})
    expect(data).toEqual({
      issuesByAreaId: {},
      currentIssueId: 0,
      firstLoadOfIssues: null,
      loading: false,
    })
  })

  test('getIssueIds returns an array of ids', () => {
    const state = {
      issuesByAreaId: {
        1: [{ id: 1 }, { id: 2 }],
        10: [{ id: 10 }],
      },
    }

    const expectedIds = [1, 2, 10]
    expect(issues.selectors.getIssueIds({ main: { issues: state } })).toEqual(
      expectedIds
    )
  })

  test('setLoading sets loading state', () => {
    const state = issues.reducer(
      { firstLoadOfIssues: new Date() },
      issues.actions.setLoading(true)
    )

    expect(
      issues.selectors.getLoading({
        main: {
          issues: state,
        },
      })
    ).toEqual(true)
  })

  test('setIssues sets the object', () => {
    const date = new Date()
    const initialState = {
      firstLoadOfIssues: date,
      issuesByAreaId: {},
    }

    let state = issues.reducer(initialState, issues.actions.setLoading(true))

    state = issues.reducer(
      state,
      issues.actions.setIssues({
        issues: [{ id: 1, number: 32, sent_at: date }],
        areaId: 5,
      })
    )

    const data = issues.selectors.getIssues({
      main: {
        issues: state,
      },
    })

    expect(data).toEqual({
      5: [{ id: 1, number: 32, isUnread: false, sent_at: date }],
    })

    expect(
      issues.selectors.getCurrentIssueId({
        main: {
          issues: state,
        },
      })
    ).toEqual(1)

    expect(
      issues.selectors.getLoading({
        main: {
          issues: state,
        },
      })
    ).toEqual(false)
  })

  test('setIssues merges the data properly', () => {
    let state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        areaId: 1,
        issues: [
          { id: 1, number: 4 },
          { id: 2, number: 5 },
          { id: 3, number: 6 },
        ],
      })
    )

    state = issues.reducer(
      state,
      issues.actions.setIssues({
        areaId: 1,
        issues: [
          { id: 1, number: 4 },
          { id: 4, number: 7 },
        ],
      })
    )

    expect(state.issuesByAreaId[1].length).toEqual(4)
    expect(state.issuesByAreaId[1].map((issue) => issue.id)).toEqual([
      4,
      3,
      2,
      1,
    ])
  })

  test('setIssues log contents', () => {
    const state = issues.reducer(
      {
        firstLoadOfIssues: new Date(),
        issuesByAreaId: {
          462: [
            {
              id: 349373,
              area_id: 462,
              number: 335,
              sent_at: '2019-04-04T00:10:12-04:00',
              isUnread: false,
            },
            {
              id: 349327,
              area_id: 462,
              number: 334,
              sent_at: '2019-04-01T18:12:01-04:00',
              isUnread: false,
            },
            {
              id: 349211,
              area_id: 462,
              number: 333,
              sent_at: '2019-03-31T17:04:48-04:00',
              isUnread: false,
            },
            {
              id: 349065,
              area_id: 462,
              number: 332,
              sent_at: '2019-03-30T16:41:59-04:00',
              isUnread: false,
            },
            {
              id: 348460,
              area_id: 462,
              number: 331,
              sent_at: '2019-03-29T17:22:36-04:00',
              isUnread: false,
            },
            {
              id: 347946,
              area_id: 462,
              number: 330,
              sent_at: '2019-03-25T17:02:11-04:00',
              isUnread: false,
            },
            {
              id: 347837,
              area_id: 462,
              number: 329,
              sent_at: '2019-03-21T16:44:54-04:00',
              isUnread: false,
            },
            {
              id: 347710,
              area_id: 462,
              number: 328,
              sent_at: '2019-03-20T17:02:26-04:00',
              isUnread: false,
            },
            {
              id: 347603,
              area_id: 462,
              number: 327,
              sent_at: '2019-03-19T17:16:26-04:00',
              isUnread: false,
            },
            {
              id: 347323,
              area_id: 462,
              number: 326,
              sent_at: '2019-03-18T17:45:21-04:00',
              isUnread: false,
            },
          ],
        },
        currentIssueId: 349373,
        loading: true,
      },
      {
        type: 'issues/setIssues',
        payload: {
          issues: [
            {
              id: 349373,
              area_id: 462,
              number: 335,
              sent_at: '2019-04-04T00:10:12-04:00',
            },
            {
              id: 349327,
              area_id: 462,
              number: 334,
              sent_at: '2019-04-01T18:12:01-04:00',
            },
            {
              id: 349211,
              area_id: 462,
              number: 333,
              sent_at: '2019-03-31T17:04:48-04:00',
            },
            {
              id: 349065,
              area_id: 462,
              number: 332,
              sent_at: '2019-03-30T16:41:59-04:00',
            },
            {
              id: 348460,
              area_id: 462,
              number: 331,
              sent_at: '2019-03-29T17:22:36-04:00',
            },
            {
              id: 347946,
              area_id: 462,
              number: 330,
              sent_at: '2019-03-25T17:02:11-04:00',
            },
            {
              id: 347837,
              area_id: 462,
              number: 329,
              sent_at: '2019-03-21T16:44:54-04:00',
            },
            {
              id: 347710,
              area_id: 462,
              number: 328,
              sent_at: '2019-03-20T17:02:26-04:00',
            },
            {
              id: 347603,
              area_id: 462,
              number: 327,
              sent_at: '2019-03-19T17:16:26-04:00',
            },
            {
              id: 347323,
              area_id: 462,
              number: 326,
              sent_at: '2019-03-18T17:45:21-04:00',
            },
          ],
          areaId: 462,
        },
      }
    )

    expect(state.issuesByAreaId[462].length).toEqual(10)
  })

  test('setIssues sets new posts to not Unread on first load', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: [
          { id: 1, number: 11, sent_at: subDays(endOfToday(), 11) },
          { id: 2, number: 22, sent_at: subDays(endOfToday(), 13) },
          { id: 3, number: 33, sent_at: subDays(endOfToday(), 16) },
        ],
        areaId: 9,
      })
    )

    const data = issues.selectors.getIssuesForArea(
      {
        main: {
          issues: {
            ...state,
          },
        },
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
          { id: 3, number: 33, isUnread: true },
        ],
      },
      firstLoadOfIssues: endOfToday(),
    }
    const state = issues.reducer(
      initialState,
      issues.actions.setIssues({
        issues: [{ id: 4, number: 9, sent_at: addDays(endOfToday(), 1) }],
        areaId: 3,
      })
    )

    const data = issues.selectors.getIssuesForArea(
      {
        main: {
          issues: {
            ...state,
          },
        },
      },
      3
    )
    const newestIssue = data.find((i) => i.id === 4)
    const previouslyUnread = data.find((i) => i.id === 3)
    const alreadyRead = data.filter((i) => !i.isUnread)

    expect(newestIssue.isUnread).toBeTruthy()
    expect(previouslyUnread.isUnread).toBeTruthy()

    for (let issue in alreadyRead) {
      expect(issue.isUnread).toBeFalsy()
    }

    expect(data.length).toEqual(4)
    // newest issue by number is first
    expect(data.map((issue) => issue.id)).toEqual([3, 2, 1, 4])
  })

  test('it keeps the latest 30 issues', () => {
    const state = issues.reducer(
      undefined,
      issues.actions.setIssues({
        issues: range(1, 31).map((id) => ({ id, number: id + 32 })),
        areaId: 5,
      })
    )

    const data = issues.selectors.getIssuesForArea(
      {
        main: {
          issues: state,
        },
      },
      5
    )

    // cant find the 31st issue
    expect(data.find((issue) => issue.id === 31)).toEqual(undefined)
    expect(data.length).toEqual(30)
  })
})
