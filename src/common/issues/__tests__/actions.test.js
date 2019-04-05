import { api } from '@common/api'
import { getIssues, fetchSpecificIssue } from '../actions'
import { issues } from '../slice'
import { appError } from '@components/AppError/slice'
import { areas } from '@common/areas'

describe('issues actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    },
    main: {
      issues: {
        firstLoadOfIssues: null,
        issuesByAreaId: {}
      }
    }
  })

  test('requests /issues with authorization header', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
      data: {
        issues: [{ id: 1 }]
      }
    }))
    const dispatch = jest.fn()

    await getIssues(1)(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas/1/issues', {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })

    expect(dispatch).toHaveBeenCalledWith(issues.actions.setLoading(true))
    expect(dispatch).toHaveBeenCalledWith(
      issues.actions.setIssues({ issues: [{ id: 1 }], areaId: 1 })
    )

    getSpy.mockRestore()
  })

  test('sets firstLoadOfIssues if there were no issues', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
      data: {
        issues: [{ id: 1 }]
      }
    }))

    const state = () => ({
      ...getState(),
      main: {
        issues: {
          issuesByAreaId: {
            3: [{ id: 1 }]
          }
        }
      }
    })

    const dispatch = jest.fn()

    await getIssues(1)(dispatch, state)

    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      issues.actions.setFirstLoadOfIssues()
    )

    getSpy.mockRestore()
  })

  test('an api error dispatches an error message', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
      throw new Error('boom')
    })

    const dispatch = jest.fn()

    await getIssues(2)(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas/2/issues', {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })

    expect(dispatch).toHaveBeenCalledWith(appError.actions.setAppError('boom'))

    getSpy.mockRestore()
  })

  describe('fetchSpecificIssue', () => {
    test('dispatches to fetch areas, issues, and posts', async () => {
      const dispatch = jest.fn()
      const getState = () => ({
        main: {
          issues: {
            issuesByAreaId: {
              50: [
                {
                  number: 26,
                  id: 4
                },
                {
                  number: 10,
                  id: 2
                }
              ]
            }
          }
        }
      })

      await fetchSpecificIssue(50, 26, 500)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(50))
    })
  })
})
