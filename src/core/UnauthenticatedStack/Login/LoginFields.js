import React from 'react'
import PropTypes from 'prop-types'
import { Linking, TouchableOpacity } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { TextInput } from '@components/TextInput'
import { PasswordInput } from '@components/PasswordInput'
import { Button } from '@components/Button'
import logoImage from '@assets/images/fpf-logo.png'
import { Version } from './styledComponents'

import {
  BottomContainer,
  Container,
  FieldContainer,
  Logo,
  LogoContainer,
  ResetPassword
} from './styledComponents'

export const LoginFields = ({
  errors,
  setFieldValue,
  handleSubmit,
  isSubmitting,
  setFieldTouched,
  touched,
  values
}) => {
  return (
    <Container>
      <LogoContainer>
        <Logo source={logoImage} resizeMode='contain' />
      </LogoContainer>
      <FieldContainer>
        <TextInput
          label='Email'
          error={errors.email}
          onChangeText={value => setFieldValue('email', value)}
          onBlur={() => setFieldTouched('email')}
          touched={touched.email}
          value={values.email}
          autoCapitalize='none'
        />
        <PasswordInput
          error={errors.password}
          touched={touched.password}
          value={values.password}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      </FieldContainer>
      <BottomContainer>
        <Button onPress={handleSubmit} disabled={isSubmitting}>
          Log in
        </Button>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://frontporchforum.com/passwords/new')
          }
        >
          <ResetPassword>Reset Password</ResetPassword>
        </TouchableOpacity>
        <Version>
          v{DeviceInfo.getVersion()} #{DeviceInfo.getBuildNumber()}
        </Version>
      </BottomContainer>
    </Container>
  )
}

LoginFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
