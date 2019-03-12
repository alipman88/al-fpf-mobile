import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import flatten from 'lodash/flatten'

import Spinner from 'react-native-loading-spinner-overlay'

import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { TextInput } from '@components/TextInput'
import { Multiselect } from '@components/Multiselect'
import { Select } from '@components/Select'
import { KeyboardAwareScrollView } from '@components/KeyboardAwareScrollView'
import { getProfileDisplayName } from '@common/utils/getProfileDisplayName'
import { Event } from '../Event'

import {
  ButtonSpacer,
  FormContainer,
  FieldWrapper,
  InputDetails,
  ButtonContainer
} from '../styledComponents'

export class ComposeFields extends React.Component {
  state = {
    duplicatePost: false
  }

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

  handleSubmit = () => {
    if (this.state.duplicatePost) {
      this.props.resetForm()
      this.setState({ duplicatePost: false })
      this.props.navigation.navigate('Forum')
    } else {
      this.props.handleSubmit()
    }
  }

  setDuplicateState = duplicatePost => {
    this.setState({ duplicatePost })
  }

  render() {
    const {
      areas,
      categories,
      errors,
      isSubmitting,
      loading,
      profiles,
      setFieldValue,
      setFieldTouched,
      touched,
      values
    } = this.props

    const { duplicatePost } = this.state

    const filteredAreas = this.getAreasForProfile(
      profiles,
      areas,
      values.profile
    )

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
                  const areaId = get(newFilteredAreas, '[0].id', 0)
                  setFieldValue('forums', areaId ? [areaId] : [])
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
              <Multiselect
                error={errors.forums}
                fieldName='Forums'
                items={filteredAreas.map(area => ({
                  id: area.id,
                  name: area.name
                }))}
                selectText='Select Forums'
                searchPlaceholderText='Search Forums'
                onSelectedItemsChange={selectedItems => {
                  setFieldTouched('forums', true)
                  setFieldValue('forums', selectedItems)
                }}
                touched={touched.forums}
                value={values.forums}
              />
            </FieldWrapper>
          )}
          <FieldWrapper>
            <Select
              placeholder={get(
                values.category,
                'name',
                'Select category that best applies'
              )}
              label='Category'
              items={categories.map(category => category.name)}
              onValueChange={index => {
                setFieldTouched('category', true)
                setFieldValue('category', categories[index])
              }}
              title='Select Category'
              value={categories.findIndex(
                category => category.id === get(values, 'category.id')
              )}
              error={errors.category}
              touched={touched.category}
            />
            {Boolean(get(values.category, 'faq')) && (
              <InputDetails>{get(values.category, 'faq')}</InputDetails>
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
          {get(values.category, 'is_event', false) && (
            <Event
              errors={errors}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setDuplicateState={this.setDuplicateState}
              touched={touched}
              values={values}
            />
          )}
          {!duplicatePost && (
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
          )}
        </FormContainer>
        <ButtonContainer>
          {!duplicatePost && (
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
          )}
          <ButtonSpacer />
          <Button onPress={this.handleSubmit}>
            {duplicatePost ? 'Cancel' : 'Submit posting'}
          </Button>
        </ButtonContainer>
      </KeyboardAwareScrollView>
    )
  }
}

ComposeFields.propTypes = {
  areas: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
