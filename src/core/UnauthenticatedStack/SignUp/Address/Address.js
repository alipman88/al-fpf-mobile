import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { AddressFields } from './AddressFields'
import { validations } from './validations'

export class Address extends React.Component {
  state = {
    submitted: false,
  }

  onSubmit = async (values, actions) => {
    const { navigation, searchAddress, setNewUserByKey } = this.props

    actions.setSubmitting(true)
    await searchAddress(values, (areas, address) => {
      setNewUserByKey({ address: values })
      if (areas.length > 0) {
        navigation.navigate('MapScreen', { areas, address })
      } else if (this.state.submitted) {
        navigation.navigate('Waitlist')
      } else {
        this.setState({ submitted: true })
      }
    })
    actions.setSubmitting(false)
  }

  render() {
    const { navigation, newUser, profileType } = this.props

    return (
      <Formik
        onSubmit={this.onSubmit}
        initialValues={newUser.address}
        validationSchema={validations}
      >
        {(props) => (
          <AddressFields
            {...props}
            navigation={navigation}
            newUser={newUser}
            noAreasFound={this.state.submitted}
            profileType={profileType}
          />
        )}
      </Formik>
    )
  }
}

Address.propTypes = {
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  searchAddress: PropTypes.func.isRequired,
  setNewUserByKey: PropTypes.func.isRequired,
  profileType: PropTypes.string.isRequired,
}
