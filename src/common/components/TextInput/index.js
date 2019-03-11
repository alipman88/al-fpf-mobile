import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, View } from 'react-native'
import { FormError } from '@components/FormError'
import { Container, Input, Icon, ForwardIcon } from './styledComponents'
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
  iconSrc,
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
      </View>
      {Boolean(iconSrc) && (
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
  forwardIcon: PropTypes.node,
  iconSrc: PropTypes.number, //image imports resolve as reference numbers
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
