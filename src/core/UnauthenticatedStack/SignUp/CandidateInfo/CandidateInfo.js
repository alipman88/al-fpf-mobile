import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { CandidateInfoFields } from './CandidateInfoFields'
import { validations } from './validations'

export class CandidateInfo extends React.Component {
  render() {
    const handleSubmit = (values) => {
      const { setNewUserByKey, navigation } = this.props
      setNewUserByKey({ candidate: values })
      navigation.navigate('CreateAccount')
    }

    const { newUser, navigation } = this.props

    return (
      <Formik
        initialValues={newUser.candidate}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validations}
      >
        {(props) => <CandidateInfoFields {...props} navigation={navigation} />}
      </Formik>
    )
  }
}

CandidateInfo.propTypes = {
  navigation: PropTypes.object.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
}
