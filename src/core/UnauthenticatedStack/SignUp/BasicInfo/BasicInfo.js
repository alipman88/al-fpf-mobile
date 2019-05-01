import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { BasicInfoFields } from './BasicInfoFields'
import { validations } from './validations'

export class BasicInfo extends React.Component {
  render() {
    const { navigation, setNewUserByKey, newUser, profileType } = this.props

    return (
      <Formik
        initialValues={newUser}
        validationSchema={validations}
        validateOnChange={false}
        render={({
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          values
        }) => (
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
}

BasicInfo.propTypes = {
  setNewUserByKey: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  profileType: PropTypes.string.isRequired
}
