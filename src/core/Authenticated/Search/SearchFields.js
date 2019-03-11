import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { TextInput } from '@components/TextInput'

import {
  FiltersText,
  FiltersToggle,
  PaddingContainer,
  SearchFormContainer
} from './styledComponents'

export const SearchFields = ({
  errors,
  handleSubmit,
  setTouched,
  setFieldValue,
  isSubmitting,
  touched,
  values
}) => (
  <SearchFormContainer>
    <Spinner visible={isSubmitting} />
    <PaddingContainer>
      <TextInput
        error={errors.keyword}
        forwardIcon={<Icon color='#9b9b9b' name='search' size={18} />}
        placeholder='Type keyword here'
        onChangeText={value => {
          setTouched('keyword', value)
          setFieldValue('keyword', value)
        }}
        returnKeyType='search'
        touched={touched.keyword}
        value={values.keyword}
        onSubmitEditing={() => handleSubmit()}
      />
      <FiltersToggle>
        <FeatherIcon name='filter' color='#6b6e7d' size={16} />
        <FiltersText>Show Filters (not yet implemented)</FiltersText>
      </FiltersToggle>
    </PaddingContainer>
  </SearchFormContainer>
)

SearchFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
