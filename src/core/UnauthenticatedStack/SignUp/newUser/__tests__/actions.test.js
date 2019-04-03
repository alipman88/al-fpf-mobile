import { api } from '@common/api'
import { postSignUp } from '../actions'
import { newUser } from '../slice'
import { appError } from '@components/AppError/slice'

describe('newUser actions', () => {
  const getState = jest.fn(() => ({
    main: {
      newUser: {
        user: {
          profilePlan: { id: 1, plan_type: 'neighbor' },
          firstName: 'Test',
          lastName: 'Testerson',
          email: 'test@testing.org',
          password: 'testtest1',
          passwordConfirmation: 'testtest1',
          business: {},
          government: {},
          address: {}
        }
      }
    }
  }))

  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('postSignUp', () => {
    const values = {
      first_name: 'Test',
      last_name: 'Testerson',
      password: 'testtest1',
      password_confirmation: 'testtest1',
      email: 'test@testing.org',
      profilePlan: { id: 1, plan_type: 'neighbor' }
    }

    test('posts user data', async () => {
      const postSpy = jest.spyOn(api, 'post').mockImplementation(() => ({
        data: {
          user: values
        }
      }))
      await postSignUp()(dispatch, getState)
      expect(postSpy).toHaveBeenCalledWith('/users', {
        user: {
          email: 'test@testing.org',
          first_name: 'Test',
          last_name: 'Testerson',
          password: 'testtest1',
          password_confirmation: 'testtest1',
          profile: { profile_plan: { id: 1, plan_type: 'neighbor' } }
        }
      })
    })

    test('it sets loading', async () => {
      postSignUp()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith(newUser.actions.setLoading(true))
    })

    test('it catches errors', async () => {
      const errorPostSpy = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })

      await postSignUp()(dispatch, getState)

      expect(errorPostSpy).toHaveBeenCalledWith('/users', {
        user: {
          email: 'test@testing.org',
          first_name: 'Test',
          last_name: 'Testerson',
          password: 'testtest1',
          password_confirmation: 'testtest1',
          profile: { profile_plan: { id: 1, plan_type: 'neighbor' } }
        }
      })
      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('boom')
      )
      errorPostSpy.mockRestore()
    })
  })
})
