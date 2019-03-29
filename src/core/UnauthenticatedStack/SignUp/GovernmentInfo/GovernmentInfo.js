import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { GovernmentInfoFields } from './GovernmentInfoFields'
import { validations } from './validations'

export class GovernmentInfo extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          title: '',
          jurisdiction: '',
          tellUsMore: ''
        }}
        onSubmit={values => {
          this.props.setNewUserByKey(values)
          // this.props.navigation.navigate('EmailVerification')
          // TODO: navigate to the right place
        }}
        validationSchema={validations}
        render={props => (
          <GovernmentInfoFields {...props} navigation={this.props.navigation} />
        )}
      />
    )
  }
}

GovernmentInfo.propTypes = {
  navigation: PropTypes.object.isRequired,
  setNewUserByKey: PropTypes.func.isRequired
}
