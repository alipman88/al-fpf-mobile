import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { profileTypes } from '@common/types/profileTypes'
import { TextInput } from '@components/TextInput'
import { PasswordInput } from '@components/PasswordInput'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'

import {
  paddingHorizontal,
  paddingVertical
} from '@common/styles/screenPadding'

import {
  FieldWrapper,
  FormHelper,
  FormFieldsWrapper,
  FormHeader
} from '../styledComponents'

export const BasicInfoFields = ({
  errors,
  setFieldValue,
  setFieldTouched,
  touched,
  values,
  newUser,
  navigation,
  setNewUserByKey
}) => {
  const onSubmit = values => {
    setNewUserByKey(values)
    navigation.navigate('Address')
  }

  const stepCount = newUser.profileType === profileTypes.NEIGHBOR ? 4 : 5
  return (
    <FullScreenWizard
      onBackPress={() => navigation.goBack()}
      onNextPress={() => onSubmit(values)}
      currentStep={1}
      steps={stepCount}
      withPadding={false}
      topPadding={35}
      nextDisabled={!isEmpty(errors) || isEmpty(touched)}
    >
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal,
          paddingVertical,
          backgroundColor: '#f2f2f2'
        }}
      >
        <FormFieldsWrapper>
          <FormHeader>Hello neighbor! Let's get started.</FormHeader>
          <FieldWrapper>
            <TextInput
              error={errors.firstName}
              label='First name'
              touched={touched.firstName}
              onBlur={() => setFieldTouched('firstName')}
              onChangeText={value => setFieldValue('firstName', value)}
              value={values.firstName}
              required
            />
          </FieldWrapper>
          <FormHelper>
            Please be neighborly! FPF requires your first and last name (even if
            you're a business)
          </FormHelper>

          <FieldWrapper>
            <TextInput
              error={errors.lastName}
              label='Last name'
              touched={touched.lastName}
              onBlur={() => setFieldTouched('lastName')}
              onChangeText={value => setFieldValue('lastName', value)}
              value={values.lastName}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextInput
              error={errors.email}
              label='Email'
              touched={touched.email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={value => setFieldValue('email', value)}
              value={values.email}
              keyboardType='email-address'
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <PasswordInput
              error={errors.password}
              label='Password'
              touched={touched.password}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              fieldKey='password'
              value={values.password}
              required
            />
          </FieldWrapper>
          <FormHelper>
            Must be at least 8 characters long, including a number and a symbol.
          </FormHelper>

          <FieldWrapper>
            <PasswordInput
              error={errors.passwordConfirm}
              label='Confirm password'
              touched={touched.passwordConfirm}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              fieldKey='passwordConfirm'
              value={values.passwordConfirm}
              required
            />
          </FieldWrapper>
        </FormFieldsWrapper>
      </KeyboardAwareScrollView>
    </FullScreenWizard>
  )
}

BasicInfoFields.propTypes = {
  errors: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired
}
