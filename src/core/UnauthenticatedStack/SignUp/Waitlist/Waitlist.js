import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { StackActions } from '@react-navigation/native'

import { WaitlistFields } from './WaitlistFields'
import { validations } from './validations'

export class Waitlist extends React.Component {
  state = {
    submitted: false,
  }

  onSubmit = (values, actions) => {
    const { navigation, setNewUserByKey, joinWaitlist } = this.props
    actions.setSubmitting(true)
    setNewUserByKey(values)
    joinWaitlist(values)
    navigation.dispatch(StackActions.replace('WaitlistSuccess'))
    actions.setSubmitting(false)
  }

  render() {
    const { navigation, newUser } = this.props

    return (
      <Formik
        onSubmit={this.onSubmit}
        initialValues={{
          ...newUser,
          ...newUser.address,
          ...newUser.waitlist,
        }}
        validationSchema={validations}
      >
        {(props) => (
          <WaitlistFields
            {...props}
            navigation={navigation}
            newUser={newUser}
          />
        )}
      </Formik>
    )
  }
}

Waitlist.propTypes = {
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  joinWaitlist: PropTypes.func.isRequired,
}
