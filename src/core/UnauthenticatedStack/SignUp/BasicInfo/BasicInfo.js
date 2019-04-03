import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { BasicInfoFields } from './BasicInfoFields'
import { validations } from './validations'

export const BasicInfo = ({
  navigation,
  setNewUserByKey,
  newUser,
  profileType
}) => {
  return (
    <Formik
      initialValues={newUser}
      validationSchema={validations}
      render={({ errors, setFieldValue, setFieldTouched, touched, values }) => (
        <BasicInfoFields
          errors={errors}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          setNewUserByKey={setNewUserByKey}
          touched={touched}
          values={values}
          newUser={newUser}
          navigation={navigation}
          profileType={profileType}
        />
      )}
    />
  )
}

BasicInfo.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  profileType: PropTypes.string.isRequired
}
