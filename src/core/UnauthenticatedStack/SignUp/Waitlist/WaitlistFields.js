import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import isEmpty from 'lodash/isEmpty'

import { FullScreenWizard } from '@components/FullScreenWizard'
import { profileTypes } from '@common/types/profileTypes'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { Multiselect } from '@components/Multiselect'
import { TextInput } from '@components/TextInput'
import { provinces } from '@common/types/provinces'
import { states } from '@common/types/states'
import {
  Container,
  Divider,
  FieldWrapper,
  Header,
  TopContainer,
  SubTitle,
  DividerContainer,
  TrioBird
} from './styledComponents'

import lineDivider from '@assets/images/createAccount/line-divider/accountsetup-line-divider.png'
import trioBird from '@assets/images/global-assets/trio-birds.png'
export class WaitlistFields extends React.Component {
  render() {
    const {
      errors,
      handleSubmit,
      isSubmitting,
      navigation,
      setFieldTouched,
      setFieldValue,
      touched,
      values,
      newUser
    } = this.props

    const CustomHeader = () => (
      <TopContainer>
        <Header centered>Join Our Waitlist</Header>
        <SubTitle>Help bring Front Porch Forum to your area!</SubTitle>
        <Divider source={lineDivider} resizeMode='stretch' />
        <TrioBird source={trioBird} />
      </TopContainer>
    )

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        onNextPress={handleSubmit}
        withPadding={false}
        customHeader={<CustomHeader />}
        nextLabel='    Join waitlist'
        // empty spaces required to center the button, this is an issue of the icon we use
        nextWidth={141}
        nextDisabled={!isEmpty(errors)}
      >
        <Spinner visible={isSubmitting} />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 20
          }}
          style={{ backgroundColor: '#f2f2f2' }}
        >
          <Container>
            <Header>Your Location</Header>
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
                required
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
                required
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
                required
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
                  setFieldValue('state', state[0])
                }}
                searchPlaceholderText='Search'
                touched={touched.state}
                value={[values.state]}
                single
                required
              />
            </FieldWrapper>
            <DividerContainer>
              <Divider source={lineDivider} resizeMode='stretch' />
            </DividerContainer>
            <Header>About you</Header>
            <FieldWrapper>
              <TextInput
                error={errors.firstName}
                label='First name'
                touched={touched.firstName}
                onChangeText={value => {
                  setFieldValue('firstName', value)
                  setFieldTouched('firstName')
                }}
                value={values.firstName}
                required
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                error={errors.lastName}
                label='Last name'
                touched={touched.lastName}
                onChangeText={value => {
                  setFieldValue('lastName', value)
                  setFieldTouched('lastName')
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
                onChangeText={value => {
                  setFieldValue('email', value)
                  setFieldTouched('email')
                }}
                value={values.email}
                required
              />
            </FieldWrapper>
            {newUser.profileType !== profileTypes.NEIGHBOR && (
              <>
                <FieldWrapper>
                  <TextInput
                    error={errors.organizationName}
                    label='Organization name'
                    touched={touched.organizationName}
                    onChangeText={value => {
                      setFieldValue('organizationName', value)
                      setFieldTouched('organizationName')
                    }}
                    value={values.organizationName}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextInput
                    error={errors.webAddress}
                    label='Web address'
                    touched={touched.webAddress}
                    onChangeText={value => {
                      setFieldValue('webAddress', value)
                      setFieldTouched('webAddress')
                    }}
                    value={values.webAddress}
                  />
                </FieldWrapper>
              </>
            )}
            <DividerContainer>
              <Divider source={lineDivider} resizeMode='stretch' />
            </DividerContainer>
            <Header>A Couple of Questions</Header>
            <FieldWrapper>
              <TextInput
                error={errors.comment}
                label='If you want to help bring Front Porch Forum to your town, please tell us how you propose to pitch in (plus any other comments you would like to share):'
                touched={touched.comment}
                onChangeText={value => {
                  setFieldValue('comment', value)
                  setFieldTouched('comment')
                }}
                value={values.comment}
                multiline={true}
                numberOfLines={4}
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                error={errors.reference}
                label='How did you learn about Front Porch Forum?'
                touched={touched.reference}
                onChangeText={value => {
                  setFieldValue('reference', value)
                  setFieldTouched('reference')
                }}
                value={values.reference}
                multiline={true}
                numberOfLines={4}
              />
            </FieldWrapper>
          </Container>
        </KeyboardAwareScrollView>
      </FullScreenWizard>
    )
  }
}

WaitlistFields.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired
}
