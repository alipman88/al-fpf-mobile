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
  FormHeader,
} from '../styledComponents'

export class BasicInfoFields extends React.Component {
  constructor(props) {
    super(props)
    this.lastNameInput = React.createRef()
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()
    this.passwordConfirmationInput = React.createRef()
  }

  render() {
    const {
      errors,
      setFieldValue,
      setFieldTouched,
      touched,
      values,
      navigation,
      profileType,
    } = this.props

    const nextDisabled = !isEmpty(errors) || isEmpty(touched)

    const onSubmit = (values) => {
      if (!nextDisabled) {
        this.props.setNewUserByKey(values)
        this.props.navigation.navigate('Address')
      }
    }

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        onNextPress={() => onSubmit(values)}
        currentStep={1}
        steps={getStepCount(profileType)}
        nextDisabled={nextDisabled}
        contentContainerStyle={{
          backgroundColor: '#f2f2f2',
        }}
      >
        <Container>
          <FormFieldsWrapper>
            <FormHeader>Hello neighbor! Let's get started.</FormHeader>
            <FieldWrapper>
              <TextInput
                error={errors.firstName}
                label='First name'
                touched={!!touched.firstName}
                onBlur={() => setFieldTouched('firstName')}
                onChangeText={(value) => {
                  setFieldValue('firstName', value)
                }}
                nextField={this.lastNameInput}
                value={values.firstName}
                required
              />
            </FieldWrapper>
            <FormHelper>
              Please be neighborly! FPF requires your first and last name (even
              if you're a business)
            </FormHelper>

            <FieldWrapper>
              <TextInput
                inputRef={this.lastNameInput}
                error={errors.lastName}
                label='Last name'
                touched={!!touched.lastName}
                onBlur={() => setFieldTouched('lastName')}
                onChangeText={(value) => {
                  setFieldValue('lastName', value)
                }}
                nextField={this.emailInput}
                value={values.lastName}
                required
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                inputRef={this.emailInput}
                error={errors.email}
                label='Email'
                touched={!!touched.email}
                onBlur={() => setFieldTouched('email')}
                onChangeText={(value) => {
                  setFieldValue('email', value)
                }}
                nextField={this.passwordInput}
                value={values.email}
                keyboardType='email-address'
                required
                autoCapitalize='none'
              />
            </FieldWrapper>
            <FieldWrapper>
              <PasswordInput
                inputRef={this.passwordInput}
                error={errors.password}
                label='Password'
                touched={!!touched.password}
                onBlur={() => setFieldTouched('password')}
                onChangeText={(value) => {
                  setFieldValue('password', value)
                }}
                nextField={this.passwordConfirmationInput}
                value={values.password}
                required
              />
            </FieldWrapper>
            <FormHelper>
              Must be at least 8 characters long, including a letter, a number,
              and a symbol.
            </FormHelper>

            <FieldWrapper>
              <PasswordInput
                inputRef={this.passwordConfirmationInput}
                error={errors.passwordConfirmation}
                label='Confirm password'
                touched={!!touched.passwordConfirmation}
                onBlur={() => setFieldTouched('passwordConfirmation')}
                onChangeText={(value) => {
                  setFieldValue('passwordConfirmation', value)
                  setFieldTouched('passwordConfirmation')
                }}
                onSubmitEditing={() => onSubmit(values)}
                value={values.passwordConfirmation}
                returnKeyType='next'
                required
              />
            </FieldWrapper>
            <FormHelper>
              False or incomplete information violates FPF's Terms of Use and
              will be grounds for account deactivation.
            </FormHelper>
          </FormFieldsWrapper>
        </Container>
      </FullScreenWizard>
    )
  }
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
  profileType: PropTypes.string.isRequired,
}
