import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { FullScreenWizard } from '@fpf/components/FullScreenWizard'
import { TextInput } from '@fpf/components/TextInput'

import { Container, Description, FieldWrapper } from './styledComponents'

export const CandidateInfoFields = ({
  errors,
  handleSubmit,
  navigation,
  setFieldTouched,
  setFieldValue,
  touched,
  values,
}) => (
  <FullScreenWizard
    onBackPress={() => navigation.goBack()}
    steps={5}
    currentStep={4}
    onNextPress={handleSubmit}
    nextDisabled={!isEmpty(errors) || isEmpty(touched)}
    withPadding={false}
    contentContainerStyle={{
      paddingBottom: 20,
      backgroundColor: '#f2f2f2',
    }}
  >
    <Container>
      <Description>
        Please tell us a little about yourself and the candidate role you are
        registered for.
      </Description>
      <FieldWrapper>
        <TextInput
          error={errors.name}
          label='Campaign name'
          onChangeText={(value) => {
            setFieldTouched('name')
            setFieldValue('name', value)
          }}
          required
          touched={!!touched.name}
          value={values.name}
          placeholder='Name of your campaign'
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextInput
          error={errors.title}
          label='Office'
          onChangeText={(value) => {
            setFieldTouched('title')
            setFieldValue('title', value)
          }}
          required
          touched={!!touched.title}
          value={values.title}
          placeholder='Office you are registered to run for'
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextInput
          error={errors.jurisdiction}
          label='Jurisdiction'
          onChangeText={(value) => {
            setFieldTouched('jurisdiction')
            setFieldValue('jurisdiction', value)
          }}
          required
          touched={!!touched.jurisdiction}
          value={values.jurisdiction}
          placeholder='Town(s), district, county, etc. covered by this office'
        />
      </FieldWrapper>
    </Container>
  </FullScreenWizard>
)

CandidateInfoFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
}
