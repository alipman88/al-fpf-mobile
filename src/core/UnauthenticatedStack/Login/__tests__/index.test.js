import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { api } from '@common/api'
import { LoginComponent } from '../index'
import { createResetStackTo } from '@common/utils/navigation'

describe('LoginComponent', () => {
  const defaultProps = {
    setAppError: jest.fn(),
    setAccessToken: jest.fn(),
    navigation: {
      dispatch: jest.fn(),
      navigate: jest.fn()
    }
  }

  afterEach(() => {
    defaultProps.setAppError.mockReset()
    defaultProps.setAccessToken.mockReset()
    defaultProps.navigation.dispatch.mockReset()
    defaultProps.navigation.navigate.mockReset()
  })

  describe('onSubmit', () => {
    test('hits the api', async () => {
      const wrapper = shallow(<LoginComponent {...defaultProps} />)
      const setSubmitting = jest.fn()
      jest.spyOn(api, 'post').mockImplementation(() => ({
        data: {
          access_token: 'abc123'
        }
      }))
      await wrapper
        .find(Formik)
        .props()
        .onSubmit(
          { email: 'test@example.com', password: 'passpass' },
          { setSubmitting }
        )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(api.post).toHaveBeenCalled()
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(defaultProps.setAccessToken).toHaveBeenCalledWith('abc123')
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(
        'AuthenticatedStack'
      )
      expect(defaultProps.navigation.dispatch).toHaveBeenCalledWith(
        createResetStackTo('Home')
      )

      api.post.mockRestore()
    })

    test('api request fails, dispatches error', async () => {
      const wrapper = shallow(<LoginComponent {...defaultProps} />)
      const setSubmitting = jest.fn()
      jest.spyOn(api, 'post').mockImplementation(() => {
        throw new Error('boom')
      })
      await wrapper
        .find(Formik)
        .props()
        .onSubmit(
          { email: 'test@example.com', password: 'passpass' },
          { setSubmitting }
        )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(api.post).toHaveBeenCalled()
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(defaultProps.setAppError).toHaveBeenCalledWith('boom')

      api.post.mockRestore()
    })
  })
})
