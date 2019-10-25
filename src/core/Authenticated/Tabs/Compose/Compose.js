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

  onSubmit = (values, actions) => {
    const { profiles, navigation } = this.props
    const { category } = values
    const categoryId = category.id > 0 ? category.id : ''
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
      category_ids: [categoryId],
      event
    }
    this.props.submitPost(
      this.onSuccess,
      postBody,
      actions.setSubmitting,
      navigation
    )
  }

  onSuccess = () => {
    this.setState({
      modalVisible: true
    })
  }

  onModalClose = resetFormMethod => {
    this.setState({ modalVisible: false })
    resetFormMethod()
    this.props.navigation.navigate('Forum')
  }

  render() {
    const {
      categories,
      currentProfileId,
      areas,
      loading,
      navigation,
      navigateWithToken,
      profiles
    } = this.props

    let profileIndex = profiles.findIndex(
      profile => profile.id === currentProfileId
    )

    const profile = profiles[profileIndex] || profiles[0]
    const areaId =
      navigation.getParam('areaId') ||
      get(profile, 'last_posted_area_id') ||
      get(profile, 'home_nf') ||
      get(profile, 'area_ids[0]') ||
      null

    return (
      <ScreenContainer grey withPadding={false}>
        <Formik
          initialValues={{
            forums: areaId ? [areaId] : [],
            profile: profileIndex,
            category: null,
            subject: navigation.getParam('title') || '',
            message: '',
            isShared: true,
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
                shouldResetForm={navigation.getParam('shouldResetForm')}
              />
              {this.state.modalVisible && (
                <Success
                  onClose={() => this.onModalClose(resetForm)}
                  navigateWithToken={navigateWithToken}
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
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  submitPost: PropTypes.func.isRequired,
  currentProfileId: PropTypes.number
}
