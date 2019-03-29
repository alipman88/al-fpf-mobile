import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { BusinessInfoFields } from './BusinessInfoFields'

export class BusinessInfo extends React.Component {
  componentDidMount() {
    this.props.getAppSettings()
  }

  render() {
    const {
      navigation,
      setNewUserByKey,
      newUser,
      categories,
      loading
    } = this.props

    return (
      <Formik
        initialValues={{
          name: '',
          categories: [],
          url: '',
          phone: '',
          description: ''
        }}
        render={({
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          values
        }) => (
          <BusinessInfoFields
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            setNewUserByKey={setNewUserByKey}
            touched={touched}
            values={values}
            newUser={newUser}
            navigation={navigation}
            categories={categories}
            loading={loading}
          />
        )}
      />
    )
  }
}

BusinessInfo.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getAppSettings: PropTypes.func.isRequired,
  newUser: PropTypes.object,
  loading: PropTypes.bool
}
