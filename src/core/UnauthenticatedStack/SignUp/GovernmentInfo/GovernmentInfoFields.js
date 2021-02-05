import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { FullScreenWizard } from '@components/FullScreenWizard'
import { TextInput } from '@components/TextInput'
import { Select } from '@components/Select'

import { Container, Description, FieldWrapper } from './styledComponents'

export const GovernmentInfoFields = ({
  errors,
  handleSubmit,
  navigation,
  setFieldTouched,
  setFieldValue,
  touched,
  values,
  governmentTitles,
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
        Please tell us a little about yourself and your government role.
      </Description>
      <FieldWrapper>
        <Select
          error={errors.title}
          label='Title'
          title='Title'
          items={governmentTitles}
          onValueChange={(value) => {
            setFieldTouched('title')
            setFieldValue('title', value)
          }}
          touched={!!touched.title}
          value={values.title}
          placeholder={
            Boolean(values.title) ? values.title : 'School Board Member'
          }
          required
        />
      </FieldWrapper>
      {values.title === 'Other' && (
        <FieldWrapper>
          <TextInput
            error={errors.name}
            label='If other, please specify'
            onChangeText={(value) => {
              setFieldTouched('name')
              setFieldValue('name', value)
            }}
            required
            touched={!!touched.name}
            value={values.name}
          />
        </FieldWrapper>
      )}
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
          placeholder='Winooski School District'
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextInput
          error={errors.notes}
          label='Tell us more'
          onChangeText={(value) => {
            setFieldTouched('notes')
            setFieldValue('notes', value)
          }}
          multiline
          touched={!!touched.notes}
          value={values.notes}
        />
      </FieldWrapper>
    </Container>
  </FullScreenWizard>
)

GovernmentInfoFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  governmentTitles: PropTypes.array.isRequired,
}
