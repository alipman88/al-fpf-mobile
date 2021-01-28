import { api } from '@common/api'
import { postSignUp } from '../actions'
import { newUser } from '../slice'
import { appMessage } from '@components/AppMessage/slice'

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
          address: {},
        },
      },
    },
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
      profilePlan: { id: 1, plan_type: 'neighbor' },
    }

    const navigation = {
      navigate: jest.fn(),
    }

    afterEach(() => {
      navigation.navigate.mockReset()
    })

    test('posts user data', async () => {
      const postSpy = jest.spyOn(api, 'post').mockImplementation(() => ({
        data: {
          user: values,
        },
      }))
      await postSignUp(navigation)(dispatch, getState)
      expect(postSpy).toHaveBeenCalledWith('/users', {
        user: {
          email: 'test@testing.org',
          first_name: 'Test',
          last_name: 'Testerson',
          password: 'testtest1',
          password_confirmation: 'testtest1',
          profile: { profile_plan_id: 1 },
        },
      })

      expect(navigation.navigate).toHaveBeenCalledWith('EmailVerification')
    })

    test('it sets loading', async () => {
      postSignUp(navigation)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith(newUser.actions.setLoading(true))
    })

    test('it catches errors', async () => {
      const errorPostSpy = jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })

      await postSignUp(navigation)(dispatch, getState)

      expect(errorPostSpy).toHaveBeenCalledWith('/users', {
        user: {
          email: 'test@testing.org',
          first_name: 'Test',
          last_name: 'Testerson',
          password: 'testtest1',
          password_confirmation: 'testtest1',
          profile: { profile_plan_id: 1 },
        },
      })
      expect(dispatch).toHaveBeenCalledWith(
        appMessage.actions.setAppError('boom')
      )
      errorPostSpy.mockRestore()
    })
  })
})
