import React from 'react'
import PropTypes from 'prop-types'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { FormError } from '@components/FormError'
import {
  FormFieldLabel,
  FormFieldLabelWrapper,
  FormFieldRequired,
} from '@components/FormFieldLabel'

import { Container } from './styledComponents'

export class Multiselect extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = props.inputRef || React.createRef()
  }

  focus() {
    if (this.inputRef.current && this.inputRef.current._toggleSelector) {
      this.inputRef.current._toggleSelector()
    }
  }

  render() {
    const {
      error,
      label,
      items,
      onConfirm,
      onSelectedItemsChange,
      onToggle,
      required,
      searchPlaceholderText,
      selectText,
      single,
      touched,
      value,
    } = this.props

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
          ref={this.inputRef}
          items={items}
          uniqueKey='id'
          subKey='children'
          selectText={selectText}
          readOnlyHeadings={true}
          searchPlaceholderText={searchPlaceholderText}
          onConfirm={onConfirm}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={value}
          onToggleSelector={(opened) => {
            if (onToggle) {
              onToggle(opened)
            }
          }}
          searchTextFontFamily={{
            fontFamily: 'ProximaNova-Regular',
          }}
          itemFontFamily={{ fontFamily: 'ProximaNova-Regular' }}
          subItemFontFamily={{
            fontFamily: 'ProximaNova-Regular',
          }}
          confirmFontFamily={{
            fontFamily: 'ProximaNova-Regular',
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
              height: 40,
            },
            selectToggleText: {
              fontSize: 14,
            },
          }}
          IconRenderer={Icon}
        />
        {hasError && <FormError>{error}</FormError>}
      </Container>
    )
  }
}

Multiselect.propTypes = {
  error: PropTypes.string,
  inputRef: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string,
  onConfirm: PropTypes.func,
  onSelectedItemsChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  required: PropTypes.bool,
  searchPlaceholderText: PropTypes.string,
  selectText: PropTypes.string,
  single: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.array,
}
