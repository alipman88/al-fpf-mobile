import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { BusinessInfoFields } from './BusinessInfoFields'
import { validations } from './validations'

export const BusinessInfo = ({
  navigation,
  setNewUserByKey,
  newUser,
  categories,
  loading,
}) => (
  <Formik
    initialValues={newUser.business}
    validationSchema={validations}
    render={({ errors, setFieldValue, setFieldTouched, touched, values }) => (
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

BusinessInfo.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  newUser: PropTypes.object,
  loading: PropTypes.bool,
}
