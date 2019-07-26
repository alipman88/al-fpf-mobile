import React from 'react'
import PropTypes from 'prop-types'
import { Formik, yupToFormErrors } from 'formik'
import { BasicInfoFields } from './BasicInfoFields'
import { validations } from './validations'

export class BasicInfo extends React.Component {
  render() {
    const { navigation, setNewUserByKey, newUser, profileType } = this.props
    // This context object is used by validateEmail to cache the last API
    // response that checks for email availability to avoid duplicate repeated
    // requests with each validation.
    const validationContext = {}

    return (
      <Formik
        initialValues={newUser}
        validate={(values, props) => {
          return validations
            .validate(values, { abortEarly: false, context: validationContext })
            .catch(err => {
              throw yupToFormErrors(err)
            })
        }}
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
