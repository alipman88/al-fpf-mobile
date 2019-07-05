import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, View } from 'react-native'
import { FormError } from '@components/FormError'
import {
  Container,
  ForwardIcon,
  IconContainer,
  StyledTextInput
} from './styledComponents'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired
} from '@components/FormFieldLabel'

export class TextInput extends React.Component {
  render() {
    const {
      error,
      forwardIcon,
      inputRef,
      label,
      nextField,
      onTapIcon,
      required,
      tapIcon,
      touched,
      ...other
    } = this.props

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
          <StyledTextInput
            blurOnSubmit={nextField ? false : null}
            returnKeyType={nextField ? 'next' : 'default'}
            onSubmitEditing={() => {
              if (nextField && nextField.current && nextField.current.focus) {
                nextField.current.focus()
              }
            }}
            {...other}
            hasError={touched && Boolean(error)}
            hasForwardIcon={Boolean(forwardIcon)}
            placeholderTextColor='#c5c5c5'
            ref={inputRef}
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
}

TextInput.propTypes = {
  error: PropTypes.string,
  forwardIcon: PropTypes.node,
  inputRef: PropTypes.object,
  tapIcon: PropTypes.node,
  label: PropTypes.string,
  nextField: PropTypes.object,
  onTapIcon: PropTypes.func,
  touched: PropTypes.bool,
  required: PropTypes.bool
}

TextInput.defaultProps = {
  keyboardType: 'default',
  nextField: null,
  secureTextEntry: false
}
