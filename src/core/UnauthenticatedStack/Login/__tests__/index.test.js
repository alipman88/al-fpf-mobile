import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { LoginComponent } from '../index'

describe('LoginComponent', () => {
  const defaultProps = {
    login: jest.fn(),
    resendEmail: jest.fn(),
    navigation: {},
  }

  describe('onSubmit', () => {
    test('calls login', async () => {
      const wrapper = shallow(<LoginComponent {...defaultProps} />)
      const setSubmitting = jest.fn()
      await wrapper
        .find(Formik)
        .props()
        .onSubmit(
          { email: 'test@example.com', password: 'passpass' },
          { setSubmitting },
        )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(defaultProps.login).toHaveBeenCalled()
      expect(setSubmitting).toHaveBeenCalledWith(true)
    })

    test('login fails, sets error', async () => {
      const login = () => {
        throw new Error('boom')
      }
      const wrapper = shallow(
        <LoginComponent {...defaultProps} login={login} />,
      )
      const setSubmitting = jest.fn()
      const setFieldError = jest.fn()
      await wrapper
        .find(Formik)
        .props()
        .onSubmit(
          { email: 'test@example.com', password: 'passpass' },
          { setSubmitting, setFieldError },
        )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(setFieldError).toHaveBeenCalledWith('email', 'boom')
    })
  })
})
