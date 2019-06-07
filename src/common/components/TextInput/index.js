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
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired
} from '@components/FormFieldLabel'

export const TextInput = ({
  autoCapitalize,
  forwardIcon,
  keyboardType,
  onChangeText,
  inputRef,
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
  required,
  error
}) => {
  const labelText = Boolean(label) && (
    <FormFieldLabelWrapper>
      <FormFieldLabel>{label}</FormFieldLabel>
      {Boolean(required) && <FormFieldRequired>(Required)</FormFieldRequired>}
    </FormFieldLabelWrapper>
  )
  return (
    <Container>
      {labelText}
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
          ref={inputRef}
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
  inputRef: PropTypes.object,
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
  required: PropTypes.bool,
  value: PropTypes.string
}

TextInput.defaultProps = {
  keyboardType: 'default',
  secureTextEntry: false
}
