import { api } from '@common/api'
import { getProfiles } from '../actions'
import { profile } from '../slice'
import { appError } from '@components/AppError/slice'

describe('profile - actions', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    }
  })

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('getProfiles', () => {
    test('fetches profile', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          user: {
            id: 1,
            profiles: [
              {
                id: 33
              }
            ]
          }
        }
      }))
      await getProfiles()(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/users', {
        headers: {
          Authorization: 'Bearer abc123'
        }
      })
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(true))
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(false))
      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 33
            }
          ]
        })
      )
      getSpy.mockRestore()
    })

    test('an api error dispatches an error message', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
        throw new Error('boom')
      })

      const dispatch = jest.fn()

      await getProfiles()(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/users', {
        headers: {
          Authorization: 'Bearer abc123'
        }
      })

      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('boom')
      )

      getSpy.mockRestore()
    })
  })
})
