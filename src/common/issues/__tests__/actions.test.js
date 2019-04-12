import { api } from '@common/api'
import { getIssues, fetchSpecificIssue } from '../actions'
import { issues } from '../slice'
import { appMessage } from '@components/AppMessage/slice'
import { areas } from '@common/areas'
import { spinner } from '@app/Spinner/slice'
import * as commonActions from '@common/actions/navigateWithToken'

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

    expect(getSpy).toHaveBeenCalledWith('/areas/1/issues?page=1&count=30', {
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

    expect(getSpy).toHaveBeenCalledWith('/areas/2/issues?page=1&count=30', {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })

    expect(dispatch).toHaveBeenCalledWith(
      appMessage.actions.setAppError('boom')
    )

    getSpy.mockRestore()
  })

  describe('fetchSpecificIssue', () => {
    test('dispatches go to a specific issue', async () => {
      const dispatch = jest.fn()
      const issuesArray = [{ id: 26, number: 500 }, { id: 27, number: 501 }]
      const getState = () => ({
        main: {
          issues: {
            issuesByAreaId: {
              50: issuesArray
            }
          },
          areas: {
            currentAreaId: 35
          }
        }
      })

      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          issuesArray
        }
      }))

      const navigate = jest.fn()
      await fetchSpecificIssue(50, 26, 500, { navigate })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(true))
      expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(50))
      expect(dispatch).toHaveBeenCalledWith(
        issues.actions.setCurrentIssueId(26)
      )
      expect(navigate).toHaveBeenCalledWith('Forum')
      expect(dispatch).toHaveBeenCalledWith(
        spinner.actions.setVisibility(false)
      )

      getSpy.mockRestore()
    })

    test('issue is not in current list, goes to web instead', async () => {
      const dispatch = jest.fn()
      const issuesArray = [{ id: 26, number: 500 }, { id: 27, number: 501 }]
      const getState = () => ({
        main: {
          issues: {
            issuesByAreaId: {
              50: issuesArray
            }
          },
          areas: {
            currentAreaId: 35
          }
        }
      })

      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          issuesArray
        }
      }))

      const navigateWithTokenSpy = jest.spyOn(
        commonActions,
        'navigateWithToken'
      )

      const navigate = jest.fn()
      await fetchSpecificIssue(50, 28, 502, { navigate })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(spinner.actions.setVisibility(true))
      expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(50))
      expect(navigateWithTokenSpy).toHaveBeenCalledWith('/areas/50/issues/502')
      expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(35))
      expect(dispatch).not.toHaveBeenCalledWith(
        issues.actions.setCurrentIssueId(26)
      )
      expect(navigate).not.toHaveBeenCalledWith('Forum')
      expect(dispatch).toHaveBeenCalledWith(
        spinner.actions.setVisibility(false)
      )

      getSpy.mockRestore()
      navigateWithTokenSpy.mockRestore()
    })
  })
})
