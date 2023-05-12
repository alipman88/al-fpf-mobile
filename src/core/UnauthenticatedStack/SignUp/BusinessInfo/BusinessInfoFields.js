import React from 'react'
import PropTypes from 'prop-types'
import { capitalize, isEmpty } from 'lodash'

import Spinner from 'react-native-loading-spinner-overlay'

import { formatPhoneNumber } from '@common/utils/formatPhoneNumber'

import { TextInput } from '@components/TextInput'
import { Multiselect } from '@components/Multiselect'
import { FullScreenWizard } from '@components/FullScreenWizard'

import {
  Container,
  FieldWrapper,
  FormFieldsWrapper,
  FormHeader,
} from '../styledComponents'

export class BusinessInfoFields extends React.Component {
  constructor(props) {
    super(props)
    this.businessCategoryIdInput = React.createRef()
    this.websiteInput = React.createRef()
    this.phoneInput = React.createRef()
    this.descriptionInput = React.createRef()
  }

  render() {
    const {
      errors,
      setFieldValue,
      setFieldTouched,
      touched,
      values,
      navigation,
      setNewUserByKey,
      categories,
      loading,
    } = this.props

    const planType = this.props.newUser.profilePlan.plan_type

    const nextDisabled =
      !isEmpty(errors) ||
      isEmpty(touched) ||
      !Boolean(values.businessCategoryId)

    const onSubmit = (values) => {
      if (!nextDisabled) {
        setNewUserByKey({ business: values })
        navigation.navigate('CreateAccount')
      }
    }

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        onNextPress={() => onSubmit(values)}
        currentStep={4}
        steps={5}
        withPadding={false}
        topPadding={35}
        nextDisabled={nextDisabled}
        contentContainerStyle={{
          backgroundColor: '#f2f2f2',
        }}
      >
        <Container>
          <Spinner visible={loading} />
          <FormHeader>
            {`To help people learn more about your ${planType} through your ` +
              `listing in FPF's Directory, please complete the following fields:`}
          </FormHeader>
          <FormFieldsWrapper>
            <FieldWrapper>
              <TextInput
                nextField={this.businessCategoryIdInput}
                blurOnSubmit={true} // next element is not a text input
                error={errors.name}
                label={`Name of ${planType}`}
                placeholder={`Your ${capitalize(planType)} Name`}
                touched={!!touched.name}
                onChangeText={(value) => {
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
                selectText={'Select category'}
                items={categories}
                onSelectedItemsChange={(selectedItems) => {
                  setFieldTouched('businessCategoryId', true)
                  setFieldValue('businessCategoryId', selectedItems[0])
                }}
                touched={!!touched.businessCategoryId}
                value={[values.businessCategoryId]}
                ref={this.businessCategoryIdInput}
                single
                required
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextInput
                nextField={this.phoneInput}
                error={errors.url}
                label='Website'
                placeholder='example.com'
                touched={!!touched.url}
                onChangeText={(value) => {
                  setFieldValue('url', value)
                  setFieldTouched('url')
                }}
                value={values.website}
                inputRef={this.websiteInput}
                keyboardType='url'
                autoCapitalize='none'
                autoCorrect={false}
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextInput
                nextField={this.descriptionInput}
                error={errors.phone}
                label='Phone'
                placeholder='802-123-4567'
                touched={!!touched.phone}
                onChangeText={(value) => {
                  setFieldValue('phone', value)
                  setFieldTouched('phone')
                }}
                value={formatPhoneNumber(values.phone)}
                inputRef={this.phoneInput}
                keyboardType='phone-pad'
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextInput
                error={errors.description}
                label={`${capitalize(planType)} description`}
                touched={!!touched.description}
                onChangeText={(value) => {
                  setFieldValue('description', value)
                  setFieldTouched('description')
                }}
                value={values.description}
                inputRef={this.descriptionInput}
                numberOfLines={10}
                multiline
                required
              />
            </FieldWrapper>
          </FormFieldsWrapper>
        </Container>
      </FullScreenWizard>
    )
  }
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
  loading: PropTypes.bool,
}
