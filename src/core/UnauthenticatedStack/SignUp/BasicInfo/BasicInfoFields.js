import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { TextInput } from '@components/TextInput'
import { PasswordInput } from '@components/PasswordInput'
import { FullScreenWizard } from '@components/FullScreenWizard'

import { getStepCount } from '../getStepCount'

import {
  Container,
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
  setNewUserByKey,
  profileType
}) => {
  const onSubmit = values => {
    setNewUserByKey(values)
    navigation.navigate('Address')
  }

  return (
    <FullScreenWizard
      onBackPress={() => navigation.goBack()}
      onNextPress={() => onSubmit(values)}
      currentStep={1}
      steps={getStepCount(profileType)}
      nextDisabled={!isEmpty(errors) || isEmpty(touched)}
      contentContainerStyle={{
        backgroundColor: '#f2f2f2'
      }}
    >
      <Container>
        <FormFieldsWrapper>
          <FormHeader>Hello neighbor! Let's get started.</FormHeader>
          <FieldWrapper>
            <TextInput
              error={errors.firstName}
              label='First name'
              touched={touched.firstName}
              onChangeText={value => {
                setFieldTouched('firstName')
                setFieldValue('firstName', value)
              }}
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
              onChangeText={value => {
                setFieldTouched('lastName')
                setFieldValue('lastName', value)
              }}
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
              onChangeText={value => {
                setFieldValue('email', value)
              }}
              value={values.email}
              keyboardType='email-address'
              required
              autoCapitalize='none'
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
              error={errors.passwordConfirmation}
              label='Confirm password'
              touched={touched.passwordConfirmation}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              fieldKey='passwordConfirmation'
              value={values.passwordConfirmation}
              required
            />
          </FieldWrapper>
          <FormHelper>
            False or incomplete information violates FPF's Terms of Use and will
            be grounds for account deactivation.
          </FormHelper>
        </FormFieldsWrapper>
      </Container>
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
  newUser: PropTypes.object.isRequired,
  profileType: PropTypes.string.isRequired
}
