import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { WaitlistFields } from './WaitlistFields'
import { validations } from './validations'
import { createResetStackTo } from '@common/utils/navigation'

export class Waitlist extends React.Component {
  state = {
    submitted: false
  }

  onSubmit = (values, actions) => {
    const { navigation, setNewUserByKey, joinWaitlist } = this.props
    actions.setSubmitting(true)
    setNewUserByKey(values)
    joinWaitlist(values)
    navigation.dispatch(createResetStackTo('WaitlistSuccess'))
    actions.setSubmitting(false)
  }

  render() {
    const { navigation, newUser } = this.props

    return (
      <Formik
        onSubmit={this.onSubmit}
        initialValues={{
          ...newUser,
          ...newUser.address
        }}
        render={props => (
          <WaitlistFields
            {...props}
            navigation={navigation}
            newUser={newUser}
          />
        )}
        validationSchema={validations}
      />
    )
  }
}

Waitlist.propTypes = {
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  joinWaitlist: PropTypes.func.isRequired
}
