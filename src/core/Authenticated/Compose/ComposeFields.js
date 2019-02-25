import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import flatten from 'lodash/flatten'

import Spinner from 'react-native-loading-spinner-overlay'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

import { FormError } from '@components/FormError'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { TextInput } from '@components/TextInput'
import { Select } from '@components/Select'
import { FormFieldLabel } from '@components/FormFieldLabel'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { getProfileDisplayName } from '@common/utils/getProfileDisplayName'

import { categories } from './categories'

import {
  ButtonSpacer,
  FormContainer,
  FieldWrapper,
  InputDetails,
  ButtonContainer
} from './styledComponents'

export class ComposeFields extends React.Component {
  getAreasForProfile(profiles, areas, profileIndex) {
    const profileAreaIds = get(
      profiles,
      `[${profileIndex}].area_ids`,
      []
    ).reduce((obj, id) => {
      obj[id] = true
      return obj
    }, {})

    return areas.filter(area => profileAreaIds[area.id])
  }

  render() {
    const {
      areas,
      errors,
      handleSubmit,
      isSubmitting,
      loading,
      profiles,
      setFieldValue,
      setFieldTouched,
      touched,
      values
    } = this.props

    const filteredAreas = this.getAreasForProfile(
      profiles,
      areas,
      values.profile
    )

    const forumsHasError = touched.forums && Boolean(errors.forums)
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps='handle'
      >
        <Spinner visible={loading || isSubmitting} />
        <FormContainer>
          {profiles.length > 1 && (
            <FieldWrapper>
              <Select
                placeholder={
                  getProfileDisplayName(profiles[values.profile]) ||
                  'Select Profile'
                }
                label='Profile'
                items={profiles.map(profile => getProfileDisplayName(profile))}
                onValueChange={index => {
                  setFieldTouched('profile', true)
                  setFieldValue('profile', index)
                  const newFilteredAreas = this.getAreasForProfile(
                    profiles,
                    areas,
                    index
                  )
                  setFieldValue('forums', [newFilteredAreas[0].id])
                }}
                title='Select Profile'
                value={values.profile}
                error={errors.profile}
                touched={touched.profile}
              />
            </FieldWrapper>
          )}
          {filteredAreas.length > 1 && (
            <FieldWrapper>
              <FormFieldLabel>Forums</FormFieldLabel>
              <SectionedMultiSelect
                items={[
                  {
                    name: 'Forums',
                    id: 0,
                    children: filteredAreas.map(area => ({
                      id: area.id,
                      name: area.name
                    }))
                  }
                ]}
                uniqueKey='id'
                subKey='children'
                selectText='Select Forums'
                onSelectedItemsChange={selectedItems => {
                  setFieldTouched('forums', true)
                  setFieldValue('forums', selectedItems)
                }}
                selectedItems={values.forums}
                searchTextFontFamily={{
                  fontFamily: 'ProximaNova-Regular'
                }}
                itemFontFamily={{ fontFamily: 'ProximaNova-Regular' }}
                subItemFontFamily={{
                  fontFamily: 'ProximaNova-Regular'
                }}
                confirmFontFamily={{
                  fontFamily: 'ProximaNova-Regular'
                }}
                showDropDown={false}
                expandDropDowns
                colors={{ primary: '#f29426' }}
                styles={{
                  selectToggle: {
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: forumsHasError ? '#dc4558' : '#d5dde1',
                    backgroundColor: forumsHasError ? '#ffebeb' : '#fff',
                    paddingHorizontal: 4,
                    height: 40
                  },
                  selectToggleText: {
                    fontSize: 14
                  }
                }}
              />
              {forumsHasError && <FormError>{errors.forums}</FormError>}
            </FieldWrapper>
          )}
          <FieldWrapper>
            <Select
              placeholder={get(
                categories,
                `[${values.category}].name`,
                'Select category that best applies'
              )}
              label='Category'
              items={categories.map(category => category.name)}
              onValueChange={index => {
                setFieldTouched('category', true)
                setFieldValue('category', index)
              }}
              title='Select Category'
              value={values.category}
              error={errors.category}
              touched={touched.category}
            />
            {Boolean(values.category) &&
              Boolean(get(categories, `[${values.category}].faq`)) && (
                <InputDetails>
                  {get(categories, `[${values.category}].faq`)}
                </InputDetails>
              )}
          </FieldWrapper>
          <FieldWrapper>
            <TextInput
              error={errors.subject}
              onChangeText={value => setFieldValue('subject', value)}
              onBlur={() => setFieldTouched('subject')}
              touched={touched.subject}
              value={values.subject}
              label='Subject'
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextInput
              error={errors.message}
              onChangeText={value => setFieldValue('message', value)}
              onBlur={() => setFieldTouched('message')}
              touched={touched.message}
              value={values.message}
              label='Message'
              multiline
            />
          </FieldWrapper>
        </FormContainer>
        <ButtonContainer>
          <Checkbox
            value={values.isShared}
            onPress={value => {
              setFieldTouched('isShared', true)
              setFieldValue('isShared', value)
            }}
          >
            Allow people in neighboring FPFs (
            {flatten(filteredAreas.map(area => area.neighbor_areas))
              .map(area => area.name)
              .join(', ')}
            ) to see this posting
          </Checkbox>
          <ButtonSpacer />
          <Button onPress={() => handleSubmit()}>Submit posting</Button>
        </ButtonContainer>
      </KeyboardAwareScrollView>
    )
  }
}

ComposeFields.propTypes = {
  areas: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  loading: PropTypes.bool,
  profiles: PropTypes.array.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
