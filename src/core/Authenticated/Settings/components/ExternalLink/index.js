import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'

import linkIcon from '@fpf/assets/images/global-assets/external-link-icons/external-link-icon-blue.png'

import { Container, Text } from './styledComponents'

export const ExternalLink = ({ children, hasBorder, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Container hasBorder={hasBorder}>
      <Text>{children}</Text>
      <Image source={linkIcon} />
    </Container>
  </TouchableOpacity>
)

ExternalLink.propTypes = {
  children: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}
