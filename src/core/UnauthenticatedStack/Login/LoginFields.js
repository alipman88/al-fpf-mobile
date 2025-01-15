import React from 'react'
import PropTypes from 'prop-types'
import { Linking, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import RNRestart from 'react-native-restart'

import {
  Config,
  getSettingsGroup,
  setSettingsGroup,
  getSettingsGroups,
} from '@fpf/common/config'
import { TextInput } from '@fpf/components/TextInput'
import { PasswordInput } from '@fpf/components/PasswordInput'
import { Button } from '@fpf/components/Button'
import { Select } from '@fpf/components/Select'
import logoImage from '@fpf/assets/images/fpf-logo.png'

import {
  Container,
  FieldContainer,
  FormContainer,
  Logo,
  LogoContainer,
  BottomText,
  ButtonSpacer,
} from './styledComponents'

export class LoginFields extends React.Component {
  handleResend = async (email) => {
    const { resendEmail } = this.props
    await resendEmail(email)
  }

  render() {
    const {
      errors,
      setFieldValue,
      handleSubmit,
      isSubmitting,
      setFieldTouched,
      touched,
      values,
      navigation,
    } = this.props

    // For non-production builds, show a picker that allows choosing between
    // the settings groups that have been defined for this build.
    // When a different settings group is selected, restart the app.
    let settingsGroupField
    const settingsGroups = getSettingsGroups().map(
      (key) => key || Config.ORIGINAL_CONFIG.ENVIRONMENT,
    )
    if (
      settingsGroups.length > 1 &&
      Config.ORIGINAL_CONFIG.ENVIRONMENT !== 'production'
    ) {
      settingsGroupField = (
        <FieldContainer>
          <Select
            items={settingsGroups}
            onValueChange={(settingsGroup) => {
              setSettingsGroup(settingsGroup)
              RNRestart.Restart()
            }}
            value={getSettingsGroup()}
            label='Connect to'
          />
        </FieldContainer>
      )
    }

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
              onChangeText={(value) => setFieldValue('email', value)}
              onBlur={() => setFieldTouched('email')}
              touched={!!touched.email}
              value={values.email}
              keyboardType='email-address'
              inputMode='email'
              autoCapitalize='none'
              autoCorrect={false}
            />
            {errors.button && errors.button.url && (
              <BottomText onPress={() => Linking.openURL(errors.button.url)}>
                {errors.button.text}
              </BottomText>
            )}
            {errors.button && errors.button.action === 'resend_email' && (
              <BottomText onPress={() => this.handleResend(values.email)}>
                {errors.button.text}
              </BottomText>
            )}
          </FieldContainer>
          <FieldContainer>
            <PasswordInput
              error={errors.password}
              touched={!!touched.password}
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              onChangeText={(value) => {
                setFieldValue('password', value)
                setFieldTouched('password')
              }}
            />
          </FieldContainer>
          <Button onPress={handleSubmit} disabled={isSubmitting}>
            Log in
          </Button>
          <ButtonSpacer />
          <FieldContainer>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileTypes')}
            >
              <BottomText>Don't have an account? Sign Up</BottomText>
            </TouchableOpacity>
          </FieldContainer>
          {settingsGroupField}
        </FormContainer>
      </Container>
    )
  }
}

LoginFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}
