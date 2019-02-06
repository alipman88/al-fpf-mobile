import React from 'react'
import PropTypes from 'prop-types'
import { Error, Container, Input, Label } from './styledComponents'

export const TextInput = ({
  autoCapitalize,
  keyboardType,
  onChangeText,
  label,
  value,
  secureTextEntry,
  onBlur,
  touched,
  error
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        hasError={touched && Boolean(error)}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
      />
      {touched && error && <Error>{error}</Error>}
    </Container>
  )
}

TextInput.propTypes = {
  autoCapitalize: PropTypes.string,
  error: PropTypes.string,
  keyboardType: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  value: PropTypes.string
}

TextInput.defaultProps = {
  keyboardType: 'default',
  secureTextEntry: false
}
