import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Formik } from 'formik'

import { ScreenContainer } from '@components/ScreenContainer'
import { Success } from './Success'

import { validations } from './validations'

import { ComposeFields } from './ComposeFields'

export class Compose extends React.Component {
  static navigationOptions = {
    title: 'Compose'
  }

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
    const { profiles } = this.props

    const postBody = {
      profile_id: profiles[values.profile].id,
      parent_post_id: values.parentPostId,
      title: values.subject,
      content: values.message,
      is_shared: values.isShared,
      area_ids: values.forums,
      category_ids: [this.props.categories[values.category].id]
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
      profiles
    } = this.props

    const profile = profiles.findIndex(
      profile => profile.id === currentProfileId
    )

    return (
      <ScreenContainer grey withPadding={false}>
        <Formik
          initialValues={{
            forums: profile ? [profile.area_ids[0]] : [],
            profile,
            category: undefined,
            subject: '',
            message: '',
            isShared: false
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
                profiles={profiles}
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
