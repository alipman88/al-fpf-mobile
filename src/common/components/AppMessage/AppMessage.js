import React from 'react'
import PropTypes from 'prop-types'
import FlashMessage, { FlashMessageManager } from 'react-native-flash-message'

export class AppMessage extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.message && this.props.message) {
      const ref = FlashMessageManager.getDefault()
      ref.showMessage({
        message: this.props.message,
        type: this.props.type
      })
    } else if (prevProps.message && !this.props.message) {
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
        onPress={() => this.props.setAppError('')}
      />
    )
  }
}

AppMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setAppError: PropTypes.func.isRequired
}
