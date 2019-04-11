import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import get from 'lodash/get'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { Button } from '@components/Button'
import { DateTimeField } from '@components/DateTimeField'
import { Multiselect } from '@components/Multiselect'
import { Select } from '@components/Select'
import { TextInput } from '@components/TextInput'

import {
  ClearFilters,
  DateFieldContainer,
  DatesWrapper,
  FieldWrapper,
  Filters,
  FiltersText,
  FiltersToggle,
  PaddingContainer,
  SearchFormContainer
} from './styledComponents'

export class SearchFields extends React.Component {
  state = {
    showAdvanced: false
  }

  componentDidMount() {
    if (this.props.showFilters) {
      this.setState(() => ({ showAdvanced: true }))
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.categoryFromLink &&
      this.props.categoryFromLink !== prevProps.categoryFromLink
    ) {
      this.props.setFieldValue('category', this.props.categoryFromLink)
      this.props.setFieldTouched('category')
      this.setState({ showAdvanced: true })
    }
  }

  render() {
    const {
      areas,
      categories,
      errors,
      handleSubmit,
      setFieldTouched,
      setFieldValue,
      isSubmitting,
      touched,
      values
    } = this.props

    return (
      <SearchFormContainer>
        <Spinner visible={isSubmitting} />
        <PaddingContainer>
          <TextInput
            error={errors.keyword}
            forwardIcon={<Icon color='#9b9b9b' name='search' size={18} />}
            placeholder='Type keyword here'
            onChangeText={value => {
              setFieldTouched('keyword', true)
              setFieldValue('keyword', value)
            }}
            returnKeyType='search'
            touched={touched.keyword}
            value={values.keyword}
            onTapIcon={() => {
              setFieldTouched('keyword', false)
              setFieldValue('keyword', '')
              this.props.onClearSearch()
            }}
            tapIcon={
              Boolean(values.keyword) ? (
                <Icon
                  name='cancel'
                  size={25}
                  color='#9b9b9b'
                  style={{ marginTop: 8 }}
                />
              ) : null
            }
            onSubmitEditing={() => handleSubmit()}
          />
          <FiltersToggle
            onPress={() =>
              this.setState(state => ({ showAdvanced: !state.showAdvanced }))
            }
          >
            <FeatherIcon name='filter' color='#6b6e7d' size={16} />
            <FiltersText>
              {this.state.showAdvanced ? 'Hide' : 'Show'} Filters
            </FiltersText>
          </FiltersToggle>
          {this.state.showAdvanced && (
            <Filters>
              <FieldWrapper>
                <Multiselect
                  fieldName='Forums'
                  error={errors.forums}
                  items={[
                    {
                      name: 'Forums',
                      id: 0,
                      children: areas.map(area => ({
                        id: area.id,
                        name: area.name
                      }))
                    }
                  ]}
                  onSelectedItemsChange={selectedItems => {
                    setFieldTouched('forums', true)
                    setFieldValue('forums', selectedItems)
                  }}
                  searchPlaceholderText='Search Forums'
                  selectText='All local forums'
                  touched={touched.forums}
                  value={values.forums}
                />
              </FieldWrapper>
              <FieldWrapper>
                <Select
                  placeholder={get(values.category, 'name', 'All categories')}
                  items={categories.map(category => category.name)}
                  onValueChange={index => {
                    setFieldTouched('category', true)
                    setFieldValue('category', categories[index])
                  }}
                  title='Select Category'
                  value={categories.findIndex(
                    category => category.id === get(values, 'category.id')
                  )}
                  error={errors.category}
                  touched={touched.category}
                />
              </FieldWrapper>
              <FieldWrapper>
                <DatesWrapper>
                  <DateFieldContainer marginRight={10}>
                    <DateTimeField
                      dateLabel='Start date'
                      dateOnly
                      defaultTimeForDate={startOfDay}
                      error={errors.fromDate}
                      onChangeValue={date => {
                        // both fields are set as touched, so errors will show to user
                        setFieldTouched('fromDate')
                        setFieldTouched('toDate')
                        setFieldValue('fromDate', date)
                      }}
                      touched={touched.fromDate}
                      value={values.fromDate}
                    />
                  </DateFieldContainer>
                  <DateFieldContainer>
                    <DateTimeField
                      dateLabel='End date'
                      dateOnly
                      defaultTimeForDate={endOfDay}
                      error={errors.toDate}
                      onChangeValue={date => {
                        setFieldTouched('fromDate')
                        setFieldTouched('toDate')
                        setFieldValue('toDate', date)
                      }}
                      touched={touched.toDate}
                      value={values.toDate}
                    />
                  </DateFieldContainer>
                </DatesWrapper>
              </FieldWrapper>
              <FieldWrapper>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('forums', [])
                    setFieldValue(
                      'fromDate',
                      startOfDay(subYears(new Date(), 2))
                    )
                    setFieldValue('toDate', endOfDay(new Date()))
                    setFieldValue('category', null)
                    setFieldTouched('forums', false)
                    setFieldTouched('fromDate', false)
                    setFieldTouched('toDate', false)
                    setFieldTouched('category', false)
                  }}
                >
                  <ClearFilters>Clear Filters</ClearFilters>
                </TouchableOpacity>
              </FieldWrapper>
            </Filters>
          )}
          <Button onPress={() => handleSubmit()}>Search</Button>
        </PaddingContainer>
      </SearchFormContainer>
    )
  }
}

SearchFields.propTypes = {
  areas: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  categoryFromLink: PropTypes.object,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  showFilters: PropTypes.bool
}
