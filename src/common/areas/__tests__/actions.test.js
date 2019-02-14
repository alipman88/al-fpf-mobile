import { api } from '@common/api'
import { getAreas } from '../actions'
import { areas } from '../slice'
import { appError } from '@components/AppError/slice'

describe('areas actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    }
  })

  test('requests /areas with authorization header', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
      data: {
        areas: [{ id: 1 }]
      }
    }))
    const dispatch = jest.fn()

    await getAreas()(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas', {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })

    expect(dispatch).toHaveBeenCalledWith(areas.actions.setAreas([{ id: 1 }]))

    getSpy.mockRestore()
  })

  test('an api error dispatches an error message', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
      throw new Error('boom')
    })

    const dispatch = jest.fn()

    await getAreas()(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas', {
      headers: {
        Authorization: 'Bearer abc123'
      }
    })

    expect(dispatch).toHaveBeenCalledWith(appError.actions.setAppError('boom'))

    getSpy.mockRestore()
  })
})
