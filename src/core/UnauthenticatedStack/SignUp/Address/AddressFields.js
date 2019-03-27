import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'

import { profileTypes } from '@common/types/profileTypes'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { Multiselect } from '@components/Multiselect'
import { TextInput } from '@components/TextInput'

import { provinces } from '@common/types/provinces'
import { states } from '@common/types/states'

import {
  Container,
  Description,
  FieldWrapper,
  NoAreasContainer,
  NoAreasHeader,
  NoAreasText
} from './styledComponents'

export class AddressFields extends React.Component {
  render() {
    const {
      errors,
      handleSubmit,
      isSubmitting,
      navigation,
      newUser,
      noAreasFound,
      setFieldTouched,
      setFieldValue,
      touched,
      values
    } = this.props

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        steps={newUser.profileType === profileTypes.NEIGHBOR ? 4 : 5}
        currentStep={2}
        onNextPress={handleSubmit}
        withPadding={false}
      >
        <Spinner visible={isSubmitting} />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 20
          }}
          style={{ backgroundColor: '#f2f2f2' }}
        >
          <Container>
            {noAreasFound && (
              <NoAreasContainer>
                <NoAreasHeader>Oops!</NoAreasHeader>
                <NoAreasText>
                  We can't find that address in our coverage area. Please review
                  and edit what you entered, or just click continue again.
                  Thanks!
                </NoAreasText>
              </NoAreasContainer>
            )}
            <Description>
              Please enter your
              {newUser.profileType === profileTypes.NEIGHBOR
                ? ''
                : ' business'}{' '}
              street address so we can find your neighborhood forum.
            </Description>
            <FieldWrapper>
              <TextInput
                error={errors.streetNumber}
                keyboardType='number-pad'
                label='House/building number'
                onChangeText={text => {
                  setFieldTouched('streetNumber')
                  setFieldValue('streetNumber', text)
                }}
                placeholder='154'
                touched={touched.streetNumber}
                value={values.streetNumber}
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextInput
                error={errors.streetName}
                label='Street name (no house number)'
                onChangeText={text => {
                  setFieldTouched('streetName')
                  setFieldValue('streetName', text)
                }}
                placeholder='Maple St'
                touched={touched.streetName}
                value={values.streetName}
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                error={errors.secondaryAddress}
                label='Apt/suite (if applicable)'
                onChangeText={text => {
                  setFieldTouched('secondaryAddress')
                  setFieldValue('secondaryAddress', text)
                }}
                placeholder='3R'
                touched={touched.secondaryAddress}
                value={values.secondaryAddress}
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                error={errors.city}
                label='City'
                onChangeText={text => {
                  setFieldTouched('city')
                  setFieldValue('city', text)
                }}
                placeholder='Bristol'
                touched={touched.city}
                value={values.city}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Multiselect
                error={errors.state}
                label='State'
                title='State'
                items={[
                  {
                    name: 'States',
                    id: 0,
                    children: states
                  },
                  {
                    name: 'Provinces',
                    id: 1,
                    children: provinces
                  }
                ]}
                onSelectedItemsChange={state => {
                  setFieldTouched('state')
                  setFieldValue('state', state)
                }}
                single
                searchPlaceholderText='Search'
                touched={touched.state}
                value={values.state}
              />
            </FieldWrapper>
          </Container>
        </KeyboardAwareScrollView>
      </FullScreenWizard>
    )
  }
}

AddressFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  noAreasFound: PropTypes.bool.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
