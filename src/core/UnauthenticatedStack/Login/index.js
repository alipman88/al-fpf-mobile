import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'

import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { api } from '@common/api'
import { currentUser } from '@common/currentUser'
import { responseError } from '@common/utils/responseError'
import { Formik } from 'formik'
import { validations } from './validations'
import { ScreenContainer } from '@components/ScreenContainer'
import { LoginFields } from './LoginFields'

import {
  BottomContainer,
  BottomText,
  LinksContainer,
  ResetPasswordContainer,
  TroubleLoggingInContainer,
  Version
} from './styledComponents'

export const LoginComponent = ({ navigation, setAccessToken }) => {
  const grassContent = (
    <BottomContainer>
      <LinksContainer>
        <ResetPasswordContainer>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://frontporchforum.com/passwords/new')
            }
          >
            <BottomText>Forgot Password</BottomText>
          </TouchableOpacity>
        </ResetPasswordContainer>
        <TroubleLoggingInContainer>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://frontporchforum.com/isfpfforme/member-faq'
              )
            }
          >
            <BottomText>Trouble logging in?</BottomText>
          </TouchableOpacity>
        </TroubleLoggingInContainer>
      </LinksContainer>
      {['development', 'staging'].includes(Config.ENVIRONMENT) && (
        <Version>
          v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()} :{' '}
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
              const response = await api.post('/login', values)
              setAccessToken(response.data.access_token)
              firebase.analytics().setAnalyticsCollectionEnabled(true)
              navigation.navigate('Authenticated')
            } catch (e) {
              actions.setFieldError('email', responseError(e))
              actions.setFieldError('button', responseError(e, 'button'))
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
              navigation={navigation}
            />
          )}
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

LoginComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  setAccessToken: PropTypes.func.isRequired
}

export const Login = connect(
  null,
  {
    setAccessToken: currentUser.actions.setAccessToken
  }
)(LoginComponent)
