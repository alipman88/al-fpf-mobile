import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { GovernmentInfoFields } from './GovernmentInfoFields'
import { validations } from './validations'

export class GovernmentInfo extends React.Component {
  render() {
    const handleSubmit = values => {
      const { setNewUserByKey, navigation } = this.props
      setNewUserByKey({ government: values })
      navigation.navigate('CreateAccount')
    }

    return (
      <Formik
        initialValues={this.props.newUser.government}
        onSubmit={values => handleSubmit(values)}
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
  setNewUserByKey: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired
}
