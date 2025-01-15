import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import { isEmpty } from 'lodash'

import { profileTypes } from '@fpf/common/types/profileTypes'
import { FullScreenWizard } from '@fpf/components/FullScreenWizard'
import { Multiselect } from '@fpf/components/Multiselect'
import { TextInput } from '@fpf/components/TextInput'

import { fpfStates } from '@fpf/common/types/fpfStates'
import { provinces } from '@fpf/common/types/provinces'
import { states } from '@fpf/common/types/states'

import { getStepCount } from '../getStepCount'
import { Container, FieldWrapper, FormFieldsWrapper } from '../styledComponents'
import {
  Description,
  NoAreasContainer,
  NoAreasHeader,
  NoAreasText,
} from './styledComponents'

export class AddressFields extends React.Component {
  constructor(props) {
    super(props)
    this.streetNameInput = React.createRef()
    this.aptNumberInput = React.createRef()
    this.cityInput = React.createRef()
    this.stateInput = React.createRef()
  }

  render() {
    const {
      errors,
      handleSubmit,
      isSubmitting,
      navigation,
      noAreasFound,
      setFieldTouched,
      setFieldValue,
      touched,
      values,
      profileType,
    } = this.props

    const nextDisabled = !isEmpty(errors) || isEmpty(touched)

    const onSubmit = (values) => {
      if (!nextDisabled) {
        handleSubmit()
      }
    }

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        steps={getStepCount(profileType)}
        currentStep={2}
        onNextPress={onSubmit}
        nextDisabled={nextDisabled}
        contentContainerStyle={{
          backgroundColor: '#f2f2f2',
        }}
      >
        <Container>
          <FormFieldsWrapper>
            <Spinner visible={isSubmitting} />
            {noAreasFound && (
              <NoAreasContainer>
                <NoAreasHeader>Oops!</NoAreasHeader>
                <NoAreasText>
                  We can't find that address in our coverage area. Please review
                  and edit what you entered, or just click "Continue" again.
                  Thanks!
                </NoAreasText>
              </NoAreasContainer>
            )}
            <Description>
              Please enter your
              {profileType === profileTypes.NEIGHBOR ? '' : ' business'} street
              address so we can find your neighborhood forum.
            </Description>
            <FieldWrapper>
              <TextInput
                nextField={this.streetNameInput}
                error={errors.streetNumber}
                keyboardType='number-pad'
                label='House/building number'
                onChangeText={(text) => {
                  setFieldTouched('streetNumber')
                  setFieldValue('streetNumber', text)
                }}
                placeholder='154'
                touched={!!touched.streetNumber}
                value={values.streetNumber}
                required
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextInput
                nextField={this.aptNumberInput}
                inputRef={this.streetNameInput}
                error={errors.streetName}
                label='Street name (no house number)'
                onChangeText={(text) => {
                  setFieldTouched('streetName')
                  setFieldValue('streetName', text)
                }}
                placeholder='Maple St'
                touched={!!touched.streetName}
                value={values.streetName}
                required
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                nextField={this.cityInput}
                inputRef={this.aptNumberInput}
                error={errors.aptNumber}
                label='Apt/suite (if applicable)'
                onChangeText={(text) => {
                  setFieldTouched('aptNumber')
                  setFieldValue('aptNumber', text)
                }}
                placeholder='3R'
                touched={!!touched.aptNumber}
                value={values.aptNumber}
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                inputRef={this.cityInput}
                error={errors.city}
                label='City'
                onChangeText={(text) => {
                  setFieldTouched('city')
                  setFieldValue('city', text)
                }}
                placeholder='Bristol'
                touched={!!touched.city}
                value={values.city}
                nextField={this.stateInput}
                blurOnSubmit={true} // next element is not a text input
                required
              />
            </FieldWrapper>
            <FieldWrapper>
              <Multiselect
                inputRef={this.stateInput}
                error={errors.state}
                label='State'
                title='State'
                items={[
                  {
                    name: 'Our Service Area',
                    id: 0,
                    children: fpfStates,
                  },
                  {
                    name: 'States',
                    id: 1,
                    children: states,
                  },
                  {
                    name: 'Provinces',
                    id: 2,
                    children: provinces,
                  },
                ]}
                onSelectedItemsChange={(state) => {
                  setFieldTouched('state')
                  setFieldValue('state', state[0])
                  onSubmit()
                }}
                onConfirm={onSubmit}
                searchPlaceholderText='Search'
                touched={!!touched.state}
                value={[values.state]}
                single
                required
              />
            </FieldWrapper>
          </FormFieldsWrapper>
        </Container>
      </FullScreenWizard>
    )
  }
}

AddressFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  noAreasFound: PropTypes.bool.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  profileType: PropTypes.string.isRequired,
}
