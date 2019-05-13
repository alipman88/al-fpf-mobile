import React from 'react'
import Autolink from 'react-native-autolink'
import PropTypes from 'prop-types'

import { OcmMessageText, AutoPostLinkStyle } from './styledComponents'

export const OcmMessage = ({ ocmMessage }) => {
  if (ocmMessage.length === 0 || ocmMessage === undefined) {
    return null
  }
  return (
    <OcmMessageText>
      <Autolink text={ocmMessage} linkStyle={AutoPostLinkStyle.link} />
    </OcmMessageText>
  )
}

OcmMessage.propTypes = {
  ocmMessage: PropTypes.string
}

OcmMessage.defaultProps = {
  ocmMessage: ''
}
