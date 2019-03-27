import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { TextInput } from '@components/TextInput'
import { PasswordInput } from '@components/PasswordInput'
import { Button } from '@components/Button'
import logoImage from '@assets/images/fpf-logo.png'

import {
  Container,
  FieldContainer,
  FormContainer,
  Logo,
  LogoContainer,
  BottomText,
  ButtonSpacer
} from './styledComponents'

export const LoginFields = ({
  errors,
  setFieldValue,
  handleSubmit,
  isSubmitting,
  setFieldTouched,
  touched,
  values,
  navigation
}) => {
  return (
    <Container>
      <Spinner visible={isSubmitting} />
      <LogoContainer>
        <Logo source={logoImage} resizeMode='contain' />
      </LogoContainer>
      <FormContainer>
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
        </FieldContainer>
        <FieldContainer>
          <PasswordInput
            error={errors.password}
            touched={touched.password}
            value={values.password}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </FieldContainer>
        <Button onPress={handleSubmit} disabled={isSubmitting}>
          Log in
        </Button>
        <ButtonSpacer />
        <TouchableOpacity onPress={() => navigation.navigate('ProfileTypes')}>
          <BottomText>Don't have an account? SignUp</BottomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileTypes')}>
          <BottomText>Profile type flow</BottomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmailVerification')}
        >
          <BottomText>Email verification</BottomText>
        </TouchableOpacity>
      </FormContainer>
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
  values: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}
