import * as api from '@common/api'
import { getProfiles, updateUser } from '../actions'
import { profile } from '../slice'
import { appMessage } from '@components/AppMessage/slice'

describe('profile - actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('getProfiles', () => {
    test('fetches profile', async () => {
      const getSpy = jest
        .spyOn(api, 'getAuthorized')
        .mockImplementation(() => ({
          data: {
            user: {
              id: 1,
              profiles: [
                {
                  id: 33,
                },
              ],
            },
          },
        }))
      await getProfiles()(dispatch, () => ({}))

      expect(getSpy).toHaveBeenCalledWith('/users', {})
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(true))
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(false))
      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 33,
            },
          ],
        })
      )
      getSpy.mockRestore()
    })

    test('an api error dispatches an error message', async () => {
      const getSpy = jest.spyOn(api, 'getAuthorized').mockImplementation(() => {
        throw new Error('boom')
      })

      const dispatch = jest.fn()

      await getProfiles()(dispatch, () => ({}))

      expect(getSpy).toHaveBeenCalledWith('/users', {})

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      getSpy.mockRestore()
    })
  })

  describe('updateUser', () => {
    test('updates profile & sets new profile into storage', async () => {
      const putSpy = jest
        .spyOn(api, 'putAuthorized')
        .mockImplementation(() => ({
          data: {
            user: {
              id: 1,
              profiles: [
                {
                  id: 33,
                },
              ],
              receive_issue_emails: false,
              receive_issue_push_notifications: true,
            },
          },
        }))

      const values = {
        receive_issue_emails: false,
        receive_issue_push_notifications: true,
      }
      await updateUser(values)(dispatch, () => ({}))

      expect(putSpy).toHaveBeenCalledWith('/users', { user: values }, {})
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(true))
      expect(dispatch).toHaveBeenCalledWith(profile.actions.setLoading(false))
      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setValueInUserData({
          key: 'receive_issue_emails',
          value: false,
        })
      )
      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setValueInUserData({
          key: 'receive_issue_push_notifications',
          value: true,
        })
      )
      expect(dispatch).toHaveBeenCalledWith(
        profile.actions.setUserProfile({
          id: 1,
          profiles: [
            {
              id: 33,
            },
          ],
          receive_issue_emails: false,
          receive_issue_push_notifications: true,
        })
      )
      putSpy.mockRestore()
    })

    test('an api error dispatches an error message', async () => {
      const putSpy = jest.spyOn(api, 'putAuthorized').mockImplementation(() => {
        throw new Error('boom')
      })

      const dispatch = jest.fn()

      const values = {
        receive_issue_push_notifications: true,
      }
      await updateUser(values)(dispatch, () => ({}))

      expect(putSpy).toHaveBeenCalledWith('/users', { user: values }, {})

      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )

      putSpy.mockRestore()
    })
  })
})
