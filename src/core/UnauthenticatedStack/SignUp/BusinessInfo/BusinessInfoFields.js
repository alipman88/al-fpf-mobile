import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import Spinner from 'react-native-loading-spinner-overlay'

import { TextInput } from '@components/TextInput'
import { Multiselect } from '@components/Multiselect'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import {
  paddingHorizontal,
  paddingVertical
} from '@common/styles/screenPadding'

import {
  FieldWrapper,
  FormFieldsWrapper,
  FormHeader
} from '../styledComponents'

export const BusinessInfoFields = ({
  errors,
  setFieldValue,
  setFieldTouched,
  touched,
  values,
  newUser,
  navigation,
  setNewUserByKey,
  categories,
  loading
}) => {
  const onSubmit = values => {
    setNewUserByKey({ business: values })
    navigation.navigate('CreateAccount')
  }

  const nextDisabled =
    !isEmpty(errors) ||
    !values.name.length ||
    values.businessCategoryId === null

  return (
    <FullScreenWizard
      onBackPress={() => navigation.goBack()}
      onNextPress={() => onSubmit(values)}
      currentStep={4}
      steps={5}
      withPadding={false}
      topPadding={35}
      nextDisabled={nextDisabled}
    >
      <Spinner visible={loading} />
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal,
          paddingVertical,
          backgroundColor: '#f2f2f2'
        }}
      >
        <FormHeader>
          To help people learn more about your business through your listing in
          FPF's Business Directory, please complete the following fields:
        </FormHeader>
        <FormFieldsWrapper>
          <FieldWrapper>
            <TextInput
              error={errors.name}
              label='Name of business or nonprofit'
              placeholder='Your Business Name'
              touched={touched.name}
              onChangeText={value => {
                setFieldValue('name', value)
                setFieldTouched('name')
              }}
              value={values.name}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Multiselect
              error={errors.businessCategoryId}
              label='Category'
              selectText={'Select the category that is the best match'}
              items={categories}
              onSelectedItemsChange={selectedItems => {
                setFieldTouched('businessCategoryId', true)
                setFieldValue('businessCategoryId', selectedItems[0])
              }}
              touched={touched.businessCategoryId}
              value={[values.businessCategoryId]}
              single
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextInput
              error={errors.website}
              label='Website'
              placeholder='example.com'
              touched={touched.website}
              onChangeText={value => {
                setFieldValue('website', value)
                setFieldTouched('website')
              }}
              value={values.website}
              keyboardType='url'
            />
          </FieldWrapper>

          <FieldWrapper>
            <TextInput
              error={errors.phone}
              label='Phone'
              placeholder='802-123-4567'
              touched={touched.phone}
              onChangeText={value => {
                setFieldValue('phone', value)
                setFieldTouched('phone')
              }}
              value={values.phone}
              keyboardType='phone-pad'
            />
          </FieldWrapper>

          <FieldWrapper>
            <TextInput
              error={errors.description}
              label='Business/nonprofit description'
              touched={touched.description}
              onChangeText={value => {
                setFieldValue('description', value)
                setFieldTouched('description')
              }}
              value={values.description}
              numberOfLines={10}
              multiline
            />
          </FieldWrapper>
        </FormFieldsWrapper>
      </KeyboardAwareScrollView>
    </FullScreenWizard>
  )
}

BusinessInfoFields.propTypes = {
  errors: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
