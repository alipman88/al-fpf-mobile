import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Formik } from 'formik'

import { ScreenContainer } from '@components/ScreenContainer'
import { Success } from './components/Success'

import { validations } from './validations'

import { ComposeFields } from './components/ComposeFields'

export class Compose extends React.Component {
  state = {
    modalVisible: false
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

  onSubmit = (values, actions) => {
    const { profiles, navigation } = this.props
    const { category } = values
    const parentId = navigation.getParam('parentPostId') || null
    const event = category.is_event
      ? {
          parent_event_id: parentId,
          start_date: values.fromDate,
          end_date: values.toDate,
          title: values.subject
        }
      : {}

    const postBody = {
      parent_post_id: parentId,
      profile_id: profiles[values.profile].id,
      title: values.subject,
      content: values.message,
      is_shared: values.isShared,
      area_ids: values.forums,
      category_ids: [category.id],
      event
    }
    this.props.submitPost(this.onSuccess, postBody, actions.setSubmitting)
  }

  onSuccess = () => {
    this.setState({
      modalVisible: true
    })
  }

  render() {
    const {
      categories,
      currentProfileId,
      areas,
      loading,
      navigation,
      profiles
    } = this.props

    let profileIndex = profiles.findIndex(
      profile => profile.id === currentProfileId
    )

    if (profileIndex === -1) {
      profileIndex = 0
    }

    const profile = profiles[profileIndex] || profiles[0]
    return (
      <ScreenContainer grey withPadding={false}>
        <Formik
          initialValues={{
            forums: profile && profile.area_ids ? [profile.area_ids[0]] : [],
            profile: profileIndex,
            category: undefined,
            subject: '',
            message: '',
            isShared: false,
            fromDate: null,
            toDate: null
          }}
          validationSchema={validations}
          onSubmit={this.onSubmit}
          render={({
            errors,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
            setFieldTouched,
            touched,
            values
          }) => (
            <React.Fragment>
              <ComposeFields
                areas={areas}
                categories={categories}
                errors={errors}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                loading={loading}
                navigation={navigation}
                profiles={profiles}
                resetForm={resetForm}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                touched={touched}
                values={values}
              />
              {this.state.modalVisible && (
                <Success
                  onClose={() => {
                    this.setState({ modalVisible: false })
                    resetForm()
                  }}
                />
              )}
            </React.Fragment>
          )}
        />
      </ScreenContainer>
    )
  }
}

Compose.propTypes = {
  areas: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  // not used yet, removed, but it will be in another ticket
  currentAreaId: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  submitPost: PropTypes.func.isRequired,
  currentProfileId: PropTypes.number.isRequired
}
