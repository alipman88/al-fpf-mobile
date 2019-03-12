import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '@components/TextInput'

import { Icon } from './styledComponents'

import passwordEyeActive from '@assets/images/createAccount/password-eyes/fpf-password-eye.png'
import passwordEyeInactive from '@assets/images/createAccount/password-eyes/fpf-password-eye-inactive.png'

export class PasswordInput extends React.Component {
  state = {
    showPassword: false
  }

  toggleShowPassword() {
    this.setState(prevState => {
      return {
        showPassword: !prevState.showPassword
      }
    })
  }
  render() {
    const { setFieldValue, setFieldTouched, error, value, touched } = this.props

    return (
      <TextInput
        label='Password'
        error={error}
        value={value}
        touched={touched}
        tapIcon={
          <Icon
            source={
              this.state.showPassword ? passwordEyeInactive : passwordEyeActive
            }
          />
        }
        secureTextEntry={!this.state.showPassword}
        onTapIcon={() => this.toggleShowPassword()}
        onChangeText={value => setFieldValue('password', value)}
        onBlur={() => setFieldTouched('password')}
      />
    )
  }
}

PasswordInput.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  touched: PropTypes.bool,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func
}
