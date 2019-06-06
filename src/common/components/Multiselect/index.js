import React from 'react'
import PropTypes from 'prop-types'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

import { FormError } from '@components/FormError'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired
} from '@components/FormFieldLabel'

import { Container } from './styledComponents'

export const Multiselect = ({
  error,
  label,
  items,
  onSelectedItemsChange,
  onToggle,
  required,
  searchPlaceholderText,
  selectText,
  single,
  touched,
  value
}) => {
  const hasError = Boolean(error) && touched
  const labelText = Boolean(label) && (
    <FormFieldLabelWrapper>
      <FormFieldLabel>{label}</FormFieldLabel>
      {Boolean(required) && <FormFieldRequired>(Required)</FormFieldRequired>}
    </FormFieldLabelWrapper>
  )
  return (
    <Container>
      {labelText}
      <SectionedMultiSelect
        items={items}
        uniqueKey='id'
        subKey='children'
        selectText={selectText}
        readOnlyHeadings={true}
        searchPlaceholderText={searchPlaceholderText}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={value}
        onToggleSelector={opened => {
          if (onToggle) {
            onToggle(opened)
          }
        }}
        searchTextFontFamily={{
          fontFamily: 'ProximaNova-Regular'
        }}
        itemFontFamily={{ fontFamily: 'ProximaNova-Regular' }}
        subItemFontFamily={{
          fontFamily: 'ProximaNova-Regular'
        }}
        confirmFontFamily={{
          fontFamily: 'ProximaNova-Regular'
        }}
        showDropDown={false}
        expandDropDowns
        single={single}
        colors={{ primary: '#f29426' }}
        styles={{
          selectToggle: {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: hasError ? '#dc4558' : '#d5dde1',
            backgroundColor: hasError ? '#ffebeb' : '#fff',
            paddingHorizontal: 4,
            height: 40
          },
          selectToggleText: {
            fontSize: 14
          }
        }}
      />
      {hasError && <FormError>{error}</FormError>}
    </Container>
  )
}

Multiselect.propTypes = {
  error: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string,
  onSelectedItemsChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  required: PropTypes.bool,
  searchPlaceholderText: PropTypes.string,
  selectText: PropTypes.string,
  single: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.array
}
