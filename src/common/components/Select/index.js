import React from 'react'
import PropTypes from 'prop-types'
import ReactNativePickerModule from 'react-native-picker-module'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { FormFieldLabel } from '@components/FormFieldLabel'
import { FormError } from '@components/FormError'

import {
  Container,
  DownArrowWrapper,
  SelectButton,
  SelectPlaceholder
} from './styledComponents'

export class Select extends React.Component {
  render() {
    const {
      placeholder,
      value,
      label,
      title,
      items,
      onValueChange,
      touched,
      error
    } = this.props

    const hasError = touched && Boolean(error)

    return (
      <Container>
        <FormFieldLabel>{label}</FormFieldLabel>
        <SelectButton
          onPress={() => this.selectModuleRef.show()}
          hasError={hasError}
        >
          <SelectPlaceholder>{placeholder}</SelectPlaceholder>
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
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  value: PropTypes.number
}
