import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import { Error, Container, Input, Label, Icon } from './styledComponents'

export const TextInput = ({
  autoCapitalize,
  keyboardType,
  onChangeText,
  label,
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
      {hasIcon && (
        <TouchableWithoutFeedback onPress={onTapIcon}>
          <Icon source={iconSrc} />
        </TouchableWithoutFeedback>
      )}

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
  hasIcon: PropTypes.bool,
  onTapIcon: PropTypes.func,
  iconSrc: PropTypes.number, //image imports resolve as reference numbers
  touched: PropTypes.bool,
  value: PropTypes.string
}

TextInput.defaultProps = {
  keyboardType: 'default',
  secureTextEntry: false
}
