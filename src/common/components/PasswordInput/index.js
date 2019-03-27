import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@components/TextInput'
import { Icon } from './styledComponents'
import passwordEyeActive from '@assets/images/createAccount/password-eyes/active.png'
import passwordEyeInactive from '@assets/images/createAccount/password-eyes/inActive.png'

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
    const {
      setFieldValue,
      setFieldTouched,
      error,
      label,
      value,
      touched,
      required,
      fieldKey
    } = this.props

    const key = fieldKey || 'password'

    return (
      <TextInput
        label={label || 'Password'}
        error={error}
        value={value}
        touched={touched}
        required={required}
        tapIcon={
          <Icon
            source={
              this.state.showPassword ? passwordEyeActive : passwordEyeInactive
            }
          />
        }
        secureTextEntry={!this.state.showPassword}
        onTapIcon={() => this.toggleShowPassword()}
        onChangeText={value => setFieldValue(key, value)}
        onBlur={() => setFieldTouched(key)}
      />
    )
  }
}

PasswordInput.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  fieldKey: PropTypes.string,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func
}
