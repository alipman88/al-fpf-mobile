import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'

import { Config } from '@common/config'
import { resendEmail } from '../actions'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { responseError } from '@common/utils/responseError'
import { Formik } from 'formik'
import { login } from '@common/session'
import { validations } from './validations'
import { ScreenContainer } from '@components/ScreenContainer'
import { LoginFields } from './LoginFields'

import {
  BottomContainer,
  BottomText,
  LinksContainer,
  ResetPasswordContainer,
  TroubleLoggingInContainer,
  Version,
} from './styledComponents'

export const LoginComponent = ({ navigation, login, resendEmail }) => {
  const grassContent = (
    <BottomContainer>
      <LinksContainer>
        <ResetPasswordContainer>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${Config.WEBSITE_HOST}/passwords/new`)
            }
          >
            <BottomText>Forgot Password</BottomText>
          </TouchableOpacity>
        </ResetPasswordContainer>
        <TroubleLoggingInContainer>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${Config.WEBSITE_HOST}/isfpfforme/member-faq`)
            }
          >
            <BottomText>Trouble logging in?</BottomText>
          </TouchableOpacity>
        </TroubleLoggingInContainer>
      </LinksContainer>
      {['development', 'staging'].includes(Config.ENVIRONMENT) && (
        <Version>
          v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()}:{' '}
          {Config.ENVIRONMENT}
        </Version>
      )}
    </BottomContainer>
  )

  return (
    <ScreenContainer grassBackground grassContent={grassContent}>
      <KeyboardAwareScrollView stretchToHeightOfScreen>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {
              await login(values)
              navigation.navigate('Authenticated')
            } catch (e) {
              actions.setFieldError('email', responseError(e))
              actions.setFieldError('button', responseError(e, 'button'))
            }

            actions.setSubmitting(false)
          }}
          validationSchema={validations}
        >
          {({
            errors,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            touched,
            values,
          }) => (
            <LoginFields
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              handleSubmit={handleSubmit}
              resendEmail={resendEmail}
              isSubmitting={isSubmitting}
              navigation={navigation}
            />
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

LoginComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
}

export const Login = connect(null, {
  login: login,
  resendEmail: resendEmail,
})(LoginComponent)
