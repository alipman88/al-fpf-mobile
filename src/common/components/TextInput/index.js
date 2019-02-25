import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import { FormError } from '@components/FormError'
import { Error, Container, Input, Icon } from './styledComponents'
import { FormFieldLabel } from '@components/FormFieldLabel'

export const TextInput = ({
  autoCapitalize,
  keyboardType,
  onChangeText,
  label,
  multiline,
  value,
  secureTextEntry,
  onBlur,
  hasIcon,
  onTapIcon,
  iconSrc,
  touched,
  error
}) => {
  return (
    <Container>
      <FormFieldLabel>{label}</FormFieldLabel>
      <Input
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        hasError={touched && Boolean(error)}
        multiline={multiline}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
      />
      {hasIcon && (
        <TouchableWithoutFeedback onPress={onTapIcon}>
          <Icon source={iconSrc} />
        </TouchableWithoutFeedback>
      )}

      {touched && Boolean(error) && <FormError>{error}</FormError>}
    </Container>
  )
}

TextInput.propTypes = {
  autoCapitalize: PropTypes.string,
  error: PropTypes.string,
  hasIcon: PropTypes.bool,
  keyboardType: PropTypes.string,
  iconSrc: PropTypes.number, //image imports resolve as reference numbers
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  onBlur: PropTypes.func,
  onTapIcon: PropTypes.func,
  touched: PropTypes.bool,
  value: PropTypes.string
}

TextInput.defaultProps = {
  keyboardType: 'default',
  secureTextEntry: false
}
