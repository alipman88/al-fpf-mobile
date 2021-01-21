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
    const { label, ...other } = this.props

    return (
      <TextInput
        {...other}
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
        autoCompleteType='password'
        autoCorrect={false}
        textContentType='newPassword'
      />
    )
  }
}

PasswordInput.propTypes = {
  label: PropTypes.string
}
