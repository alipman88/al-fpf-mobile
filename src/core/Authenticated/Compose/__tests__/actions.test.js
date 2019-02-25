import { submitPost } from '../actions'
import { api } from '@common/api'
import { appError } from '@components/AppError/slice'

describe('Compose - actions', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    }
  })
  const setSubmitting = jest.fn()
  const navigation = {
    navigate: jest.fn()
  }

  afterEach(() => {
    dispatch.mockReset()
    setSubmitting.mockReset()
    navigation.navigate.mockReset()
  })

  describe('submitPost', () => {
    test('calls api.post', async () => {
      const spy = jest.spyOn(api, 'post').mockImplementation(() => ({}))

      await submitPost(navigation, { subject: 'Subject' }, setSubmitting)(
        dispatch,
        getState
      )

      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(spy).toHaveBeenCalledWith(
        '/users/posts',
        { subject: 'Subject' },
        {
          headers: {
            Authorization: 'Bearer abc123'
          }
        }
      )
      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(navigation.navigate).toHaveBeenCalledWith('Forum')

      spy.mockRestore()
    })

    test('dispatches app error', async () => {
      const spy = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('error')
      })

      await submitPost(navigation, { subject: 'Subject' }, setSubmitting)(
        dispatch,
        getState
      )

      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(spy).toHaveBeenCalledWith(
        '/users/posts',
        { subject: 'Subject' },
        {
          headers: {
            Authorization: 'Bearer abc123'
          }
        }
      )
      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('error')
      )
      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(navigation.navigate).toHaveBeenCalledWith('Forum')

      spy.mockRestore()
    })
  })
})
