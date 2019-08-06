import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'

import Spinner from 'react-native-loading-spinner-overlay'

import { FormError } from '@components/FormError'
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

  constructor(props) {
    super(props)

    this.subjectRef = React.createRef()
    this.messageRef = React.createRef()
  }

  blurTextInputs = () => {
    this.subjectRef.current.blur()
    this.messageRef.current.blur()
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

  getNeighborNames(areas) {
    const selectedAreas = this.props.values.forums
      ? this.props.values.forums
      : []
    const neighborNames = uniq(
      flatten(
        areas
          .filter(area => selectedAreas.includes(area.id))
          .map(area => area.neighbor_areas)
      ).map(area => area.name)
    ).join(', ')
    if (neighborNames.length > 0) {
      return neighborNames
    } else {
      return 'No available areas for sharing'
    }
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

  componentDidUpdate(prevProps) {
    const { resetForm, shouldResetForm, navigation } = this.props

    if (shouldResetForm) {
      resetForm()
      navigation.setParams({ shouldResetForm: null })
    }
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

    const isDuplicateEvent =
      duplicatePost && get(values, 'category.is_event', false)

    // Add 'None Apply' category unique to post submission
    const composeCategories = categories.slice()
    composeCategories.push({
      name: 'None Apply',
      id: -1
    })

    let categoryValue = composeCategories.findIndex(
      category => category.id === get(values, 'category.id')
    )

    if (categoryValue === -1) {
      categoryValue = null
    }

    return (
      <KeyboardAwareScrollView>
        <Spinner visible={loading || isSubmitting} />
        <FormContainer>
          {profiles.length === 0 && (
            <FieldWrapper>
              <FormError>
                You will not be able to submit without any active profiles.
              </FormError>
            </FieldWrapper>
          )}
          {profiles.length > 1 && (
            <FieldWrapper>
              <Select
                onPress={this.blurTextInputs}
                placeholder={
                  getProfileDisplayName(profiles[values.profile], false) ||
                  'Select Profile'
                }
                label='Profile'
                items={profiles.map(profile =>
                  getProfileDisplayName(profile, false)
                )}
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
                touched={touched.profile !== undefined}
              />
            </FieldWrapper>
          )}
          {filteredAreas.length > 1 && (
            <FieldWrapper>
              <Multiselect
                onToggle={opened => {
                  if (opened) {
                    this.blurTextInputs()
                  }
                }}
                error={errors.forums}
                label='Forums'
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
                selectText='Select Forums'
                searchPlaceholderText='Search Forums'
                onSelectedItemsChange={selectedItems => {
                  setFieldTouched('forums', true)
                  setFieldValue('forums', selectedItems)
                  this.blurTextInputs()
                }}
                touched={touched.forums}
                value={values.forums}
              />
            </FieldWrapper>
          )}
          <FieldWrapper>
            <Select
              onPress={this.blurTextInputs}
              placeholder={get(
                values.category,
                'name',
                'Select category that best applies'
              )}
              label='Category'
              items={composeCategories.map(category => category.name)}
              onValueChange={index => {
                setFieldTouched('category', true)
                setFieldValue('category', composeCategories[index])
              }}
              title='Select Category'
              value={categoryValue}
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
              placeholder='Type the subject of your posting here'
              label='Subject'
              inputRef={this.subjectRef}
            />
          </FieldWrapper>
          {get(values.category, 'is_event', false) && (
            <Event
              blurTextInputs={this.blurTextInputs}
              errors={errors}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              setDuplicateState={this.setDuplicateState}
              touched={touched}
              values={values}
            />
          )}
          {!isDuplicateEvent && (
            <FieldWrapper>
              <TextInput
                error={errors.message}
                onChangeText={value => setFieldValue('message', value)}
                onBlur={() => setFieldTouched('message')}
                touched={touched.message}
                value={values.message}
                label='Message'
                placeholder='Type the body of your posting here'
                inputRef={this.messageRef}
                multiline
              />
            </FieldWrapper>
          )}
        </FormContainer>
        <ButtonContainer>
          {!isDuplicateEvent && (
            <Checkbox
              value={values.isShared}
              onPress={value => {
                setFieldTouched('isShared', true)
                setFieldValue('isShared', value)
              }}
            >
              Allow people in neighboring FPFs (
              {this.getNeighborNames(filteredAreas)}) to see this posting
            </Checkbox>
          )}
          <ButtonSpacer />
          <Button onPress={this.handleSubmit}>
            {isDuplicateEvent ? 'Done' : 'Submit posting'}
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
  shouldResetForm: PropTypes.bool,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
