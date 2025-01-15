import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@fpf/components/TextInput'
import { Icon } from './styledComponents'
import passwordEyeActive from '@fpf/assets/images/createAccount/password-eyes/active.png'
import passwordEyeInactive from '@fpf/assets/images/createAccount/password-eyes/inActive.png'

export class PasswordInput extends React.Component {
  state = {
    showPassword: false,
  }

  toggleShowPassword() {
    this.setState((prevState) => {
      return {
        showPassword: !prevState.showPassword,
      }
    })
  }
  render() {
    const { autoComplete, label, ...other } = this.props

    return (
      <TextInput
        {...other}
        autoComplete={autoComplete || 'current-password'}
        label={label || 'Password'}
        tapIcon={
          <Icon
            source={
              this.state.showPassword ? passwordEyeActive : passwordEyeInactive
            }
          />
        }
        secureTextEntry={!this.state.showPassword}
        onTapIcon={() => this.toggleShowPassword()}
        autoCapitalize='none'
        autoCorrect={false}
      />
    )
  }
}

PasswordInput.propTypes = {
  autoComplete: PropTypes.string,
  label: PropTypes.string,
}
