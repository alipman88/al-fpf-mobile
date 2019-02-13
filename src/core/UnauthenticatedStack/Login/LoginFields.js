import React from 'react'
import PropTypes from 'prop-types'
import { Linking, TouchableOpacity } from 'react-native'
import { TextInput } from '@components/TextInput'
import { Button } from '@components/Button'
import logoImage from '@assets/images/fpf-logo.png'

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
        <TextInput
          label='Password'
          error={errors.password}
          onChangeText={value => setFieldValue('password', value)}
          onBlur={() => setFieldTouched('password')}
          secureTextEntry
          touched={touched.password}
          value={values.password}
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
