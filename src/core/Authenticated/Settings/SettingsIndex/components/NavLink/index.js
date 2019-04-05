import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

import chevron from '@assets/images/global-assets/settings-chevron.png'

import { LinkContainer, LinkText } from './styledComponents'

export const NavLink = ({ linkText, onPress, hasBorder }) => (
  <LinkContainer onPress={onPress} hasBorder={hasBorder}>
    <LinkText>{linkText}</LinkText>
    <Image source={chevron} />
  </LinkContainer>
)

NavLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  hasBorder: PropTypes.bool.isRequired
}
