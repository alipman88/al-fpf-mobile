import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, View } from 'react-native'
import { FormError } from '@components/FormError'
import {
  Container,
  Input,
  IconContainer,
  ForwardIcon
} from './styledComponents'
import { FormFieldLabel } from '@components/FormFieldLabel'

export const TextInput = ({
  autoCapitalize,
  forwardIcon,
  keyboardType,
  onChangeText,
  label,
  multiline,
  placeholder,
  value,
  returnKeyType,
  secureTextEntry,
  onBlur,
  onSubmitEditing,
  onTapIcon,
  tapIcon,
  touched,
  error
}) => {
  return (
    <Container>
      {Boolean(label) && <FormFieldLabel>{label}</FormFieldLabel>}
      <View>
        <Input
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          hasError={touched && Boolean(error)}
          hasForwardIcon={Boolean(forwardIcon)}
          multiline={multiline}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#c5c5c5'
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          value={value}
        />
        {Boolean(forwardIcon) && <ForwardIcon>{forwardIcon}</ForwardIcon>}
        {Boolean(tapIcon) && (
          <TouchableWithoutFeedback onPress={onTapIcon}>
            <IconContainer>{tapIcon}</IconContainer>
          </TouchableWithoutFeedback>
        )}
      </View>

      {touched && Boolean(error) && <FormError>{error}</FormError>}
    </Container>
  )
}

TextInput.propTypes = {
  autoCapitalize: PropTypes.string,
  error: PropTypes.string,
  forwardIcon: PropTypes.node,
  tapIcon: PropTypes.node,
  keyboardType: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onTapIcon: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string
}

TextInput.defaultProps = {
  keyboardType: 'default',
  secureTextEntry: false
}
