import React from 'react'
import PropTypes from 'prop-types'
import SpinnerOverlay from 'react-native-loading-spinner-overlay'

export const Spinner = ({ visible }) => <SpinnerOverlay visible={visible} />

Spinner.propTypes = {
  visible: PropTypes.bool,
}
