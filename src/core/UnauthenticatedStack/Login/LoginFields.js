import React from 'react'
import PropTypes from 'prop-types'
import { Linking, TouchableOpacity, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import { Config, getSettingsGroup, setSettingsGroup } from '@common/config'
import { TextInput } from '@components/TextInput'
import { PasswordInput } from '@components/PasswordInput'
import { Button } from '@components/Button'
import { Select } from '@components/Select'
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

export class LoginFields extends React.Component {
  state = {
    settingsGroup: getSettingsGroup()
  }

  handleResend = async email => {
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
      navigation
    } = this.props

    let settingsGroupField
    if (Config.ORIGINAL_CONFIG.ENVIRONMENT !== 'production') {
      const groups = ['production', 'staging', 'android_dev', 'ios_dev']

      settingsGroupField = (
        <FieldContainer>
          <Text style={{ marginTop: 20 }}>Connect to:</Text>
          <Select
            placeholder={this.state.settingsGroup}
            items={groups}
            onValueChange={index => {
              // TODO(NMH): tell the user to restart the app (and how to do so)
              const settingsGroup = groups[index]
              this.setState({ settingsGroup })
              setSettingsGroup(settingsGroup)
            }}
            title='Connect to'
            value={groups.indexOf(this.state.settingsGroup)}
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
              onChangeText={value => setFieldValue('email', value)}
              onBlur={() => setFieldTouched('email')}
              touched={touched.email}
              value={values.email}
              keyboardType='email-address'
              autoCapitalize='none'
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
            <BottomText>Don't have an account? Sign Up</BottomText>
          </TouchableOpacity>
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
  navigation: PropTypes.object.isRequired
}
