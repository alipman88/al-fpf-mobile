import React from 'react'
import PropTypes from 'prop-types'
import FlashMessage, { FlashMessageManager } from 'react-native-flash-message'

export class AppError extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.error && this.props.error) {
      const ref = FlashMessageManager.getDefault()
      ref.showMessage({
        message: this.props.error,
        type: 'danger'
      })
    } else if (prevProps.error && !this.props.error) {
      const ref = FlashMessageManager.getDefault()
      ref.hideMessage()
    }
  }

  render() {
    return (
      <FlashMessage
        autoHide={false}
        icon='auto'
        position='top'
        onPress={() => this.props.setAppError(null)}
      />
    )
  }
}

AppError.propTypes = {
  error: PropTypes.string.isRequired,
  setAppError: PropTypes.func.isRequired
}
