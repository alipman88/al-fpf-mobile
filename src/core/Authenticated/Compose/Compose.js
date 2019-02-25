import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Formik } from 'formik'

import { ScreenContainer } from '@components/ScreenContainer'

import { validations } from './validations'

import { ComposeFields } from './ComposeFields'

import { categories } from './categories'

export class Compose extends React.Component {
  static navigationOptions = {
    title: 'Compose'
  }

  componentDidMount() {
    this.props.getProfiles()
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
    const { navigation, profiles } = this.props

    const postBody = {
      profile_id: profiles[values.profile].id,
      parent_post_id: values.parentPostId,
      title: values.subject,
      content: values.message,
      is_shared: values.isShared,
      area_ids: values.forums,
      category_ids: [categories[values.category].id]
    }
    this.props.submitPost(navigation, postBody, actions.setSubmitting)
  }

  render() {
    const { currentProfileId, areas, loading, profiles } = this.props

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
            setFieldValue,
            setFieldTouched,
            touched,
            values
          }) => (
            <ComposeFields
              areas={areas}
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
          )}
        />
      </ScreenContainer>
    )
  }
}

Compose.propTypes = {
  areas: PropTypes.array.isRequired,
  // not used yet, removed, but it will be in another ticket
  currentAreaId: PropTypes.number.isRequired,
  getProfiles: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  submitPost: PropTypes.func.isRequired,
  currentProfileId: PropTypes.number.isRequired
}
