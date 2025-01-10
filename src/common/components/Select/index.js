import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-native-element-dropdown'

import { FormError } from '@fpf/components/FormError'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired,
} from '@fpf/components/FormFieldLabel'

import { Container, dropdownStyles } from './styledComponents'

export const Select = (props) => {
  const {
    placeholder,
    value,
    label,
    items,
    onValueChange,
    touched,
    error,
    required,
  } = props

  const hasError = touched && Boolean(error)

  const labelText = Boolean(label) && (
    <FormFieldLabelWrapper>
      <FormFieldLabel>{label}</FormFieldLabel>
      {Boolean(required) && <FormFieldRequired>(Required)</FormFieldRequired>}
    </FormFieldLabelWrapper>
  )

  return (
    <Container>
      {labelText}
      <Dropdown
        value={value != null ? '' + value : value}
        data={items.map((item) => ({ label: item, value: item }))}
        labelField='label'
        valueField='value'
        placeholder={placeholder}
        onChange={(item) => onValueChange(item.value)}
        style={dropdownStyles.dropdown}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
      />
      {hasError && <FormError>{error}</FormError>}
    </Container>
  )
}

Select.propTypes = {
  error: PropTypes.string,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
}
