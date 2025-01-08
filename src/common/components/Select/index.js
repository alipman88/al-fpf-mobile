import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ReactNativePickerModule from 'react-native-picker-module'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { FormError } from '@fpf/components/FormError'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired,
} from '@fpf/components/FormFieldLabel'

import {
  Container,
  DownArrowWrapper,
  SelectButton,
  SelectPlaceholder,
} from './styledComponents'

export const Select = (props) => {
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
    required,
  } = props

  const pickerRef = useRef(null)

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
          pickerRef.current?.show()
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
        ref={pickerRef}
        value={value != null ? '' + value : value}
        title={title}
        items={items}
        onValueChange={onValueChange}
      />
      {hasError && <FormError>{error}</FormError>}
    </Container>
  )
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
}
