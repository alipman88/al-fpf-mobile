import { api } from '@common/api'
import { getAreas } from '../actions'
import { areas } from '../slice'
import { appMessage } from '@components/AppMessage/slice'

describe('areas actions', () => {
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123',
      },
    },
  })
  const navigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
  }

  test('requests /areas with authorization header', async () => {
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
      data: {
        areas: [{ id: 1 }],
        pagination: {
          pages: 1,
        },
      },
    }))
    const dispatch = jest.fn()

    await getAreas()(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas?page=1', {
      headers: {
        Authorization: 'Bearer abc123',
      },
    })

    expect(dispatch).toHaveBeenCalledWith(areas.actions.setLoading(true))
    expect(dispatch).toHaveBeenCalledWith(areas.actions.setAreas([{ id: 1 }]))

    getSpy.mockRestore()
  })

  test('with two pages, api is called twice', async () => {
    const getSpy = jest
      .spyOn(api, 'get')
      .mockImplementationOnce(() => ({
        data: {
          areas: [{ id: 1 }],
          pagination: {
            pages: 2,
          },
        },
      }))
      .mockImplementationOnce(() => ({
        data: {
          areas: [{ id: 2 }],
          pagination: {
            pages: 2,
          },
        },
      }))
    const dispatch = jest.fn()

    await getAreas()(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas?page=1', {
      headers: {
        Authorization: 'Bearer abc123',
      },
    })

    expect(getSpy).toHaveBeenCalledWith('/areas?page=2', {
      headers: {
        Authorization: 'Bearer abc123',
      },
    })

    expect(getSpy).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenCalledWith(
      areas.actions.setAreas([{ id: 1 }, { id: 2 }])
    )
    getSpy.mockRestore()
  })

  test('an api error dispatches an error message', async () => {
    const error = new Error('boom')
    error.response = { status: 401 }
    const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
      throw error
    })

    const dispatch = jest.fn()

    await getAreas(navigation)(dispatch, getState)

    expect(getSpy).toHaveBeenCalledWith('/areas?page=1', {
      headers: {
        Authorization: 'Bearer abc123',
      },
    })

    expect(dispatch).toHaveBeenCalledWith(
      appMessage.actions.setAppError('boom')
    )

    expect(navigation.navigate).toHaveBeenCalledWith('SplashScreen')
    expect(navigation.dispatch).toHaveBeenCalledTimes(1)

    getSpy.mockRestore()
  })
})
