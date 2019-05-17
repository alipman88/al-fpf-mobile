import { submitPost } from '../actions'
import { api } from '@common/api'
import { appMessage } from '@components/AppMessage/slice'

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
  const onSuccess = jest.fn()
  const navigation = {
    navigate: jest.fn(),
    dispatch: jest.fn()
  }

  afterEach(() => {
    dispatch.mockReset()
    setSubmitting.mockReset()
    navigation.navigate.mockReset()
    navigation.dispatch.mockReset()
    onSuccess.mockReset()
  })

  describe('submitPost', () => {
    test('calls api.post', async () => {
      const spy = jest.spyOn(api, 'post').mockImplementation(() => ({}))

      await submitPost(onSuccess, { subject: 'Subject' }, setSubmitting)(
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
      expect(onSuccess).toHaveBeenCalled()

      spy.mockRestore()
    })

    test('dispatches app error', async () => {
      const error = new Error('error')
      error.response = { status: 401 }
      const spy = jest.spyOn(api, 'post').mockImplementation(() => {
        throw error
      })

      await submitPost(
        onSuccess,
        { subject: 'Subject' },
        setSubmitting,
        navigation
      )(dispatch, getState)

      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(onSuccess).toHaveBeenCalledTimes(0)
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
        appMessage.actions.setAppError('error')
      )

      expect(navigation.navigate).toHaveBeenCalledWith('SplashScreen')
      expect(navigation.dispatch).toHaveBeenCalledTimes(1)

      expect(setSubmitting).toHaveBeenCalledWith(false)

      spy.mockRestore()
    })
  })
})
