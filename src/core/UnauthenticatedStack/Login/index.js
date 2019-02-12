import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'

import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { api } from '@common/api'
import { appError } from '@components/AppError/slice'
import { currentUser } from '@common/currentUser'
import { responseError } from '@common/utils/responseError'
import { Formik } from 'formik'
import { validations } from './validations'
import { ScreenContainer } from '@components/ScreenContainer'
import { LoginFields } from './LoginFields'

export const LoginComponent = ({ setAppError, setAccessToken }) => {
  return (
    <ScreenContainer grassBackground>
      <KeyboardAwareScrollView enableOnAndroid>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {
              const response = await api.post('/login', values)
              setAccessToken(response.access_token)
              // TODO: Redirect to home tabs
            } catch (e) {
              setAppError(responseError(e))
            }

            actions.setSubmitting(false)
          }}
          validationSchema={validations}
          render={({
            errors,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            touched,
            values
          }) => (
            <LoginFields
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

LoginComponent.propTypes = {
  setAppError: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired
}

export const Login = connect(
  null,
  {
    setAppError: appError.actions.setAppError,
    setAccessToken: currentUser.actions.setAccessToken
  }
)(LoginComponent)
