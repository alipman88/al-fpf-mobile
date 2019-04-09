import { api } from '@common/api'
import { getAppSettings } from '../actions'
import { appSettings } from '../slice'
import { appMessage } from '@components/AppMessage/slice'

describe('appSettings - actions', () => {
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

  describe('getAppSettings', () => {
    test('fetches profile', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          posting_truncate_length: 500,
          categories: [{ id: 1 }]
        }
      }))
      await getAppSettings()(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/settings')
      expect(dispatch).toHaveBeenCalledWith(
        appSettings.actions.setLoading(true)
      )
      expect(dispatch).toHaveBeenCalledWith(
        appSettings.actions.setLoading(false)
      )
      expect(dispatch).toHaveBeenCalledWith(
        appSettings.actions.setAppSettings({
          posting_truncate_length: 500,
          categories: [{ id: 1 }]
        })
      )
      getSpy.mockRestore()
    })

    test('an api error dispatches an error message', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
        throw new Error('boom')
      })

      const dispatch = jest.fn()

      await getAppSettings()(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/settings')

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      getSpy.mockRestore()
    })
  })
})
