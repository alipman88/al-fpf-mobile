import { api } from '@common/api'
import { getIssues } from '../actions'
import { issues } from '../slice'
import { appError } from '@components/AppError/slice'

describe('issues actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
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

    expect(dispatch).toHaveBeenCalledWith(issues.actions.setIssues([{ id: 1 }]))

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
})
