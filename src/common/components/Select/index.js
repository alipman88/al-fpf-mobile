import React from 'react'
import PropTypes from 'prop-types'
import ReactNativePickerModule from 'react-native-picker-module'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { FormError } from '@components/FormError'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired
} from '@components/FormFieldLabel'

import {
  Container,
  DownArrowWrapper,
  SelectButton,
  SelectPlaceholder
} from './styledComponents'

export class Select extends React.Component {
  render() {
    const {
      onPress,
      placeholder,
      value,
      label,
      title,
      items,
      onValueChange,
      touched,
      error,
      required
    } = this.props

    const hasError = touched && Boolean(error)

    const labelText = Boolean(label) && (
      <FormFieldLabelWrapper>
        <FormFieldLabel>{label}</FormFieldLabel>
        {Boolean(required) && <FormFieldRequired>(Required)</FormFieldRequired>}
      </FormFieldLabelWrapper>
    )

    const placeholderColor = Boolean(value) || value === 0 ? '#000' : '#c5c5c5'
    return (
      <Container>
        {labelText}
        <SelectButton
          onPress={() => {
            if (onPress) {
              onPress()
            }
            this.selectModuleRef.show()
          }}
          hasError={hasError}
        >
          <SelectPlaceholder color={placeholderColor}>
            {placeholder}
          </SelectPlaceholder>
          <DownArrowWrapper>
            <Icon size={24} name='keyboard-arrow-down' />
          </DownArrowWrapper>
        </SelectButton>
        <ReactNativePickerModule
          pickerRef={e => {
            this.selectModuleRef = e
          }}
          value={value}
          title={title}
          items={items}
          onValueChange={onValueChange}
        />
        {hasError && <FormError>{error}</FormError>}
      </Container>
    )
  }
}

Select.propTypes = {
  error: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onPress: PropTypes.func,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.number,
  required: PropTypes.bool
}
