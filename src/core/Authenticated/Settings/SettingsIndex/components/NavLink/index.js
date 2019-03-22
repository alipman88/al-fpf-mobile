import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

import chevron from '@assets/images/global-assets/settings-chevron.png'

import { Container, LinkContainer, LinkText } from './styledComponents'

export const NavLink = ({ linkText, onPress }) => (
  <Container>
    <LinkContainer onPress={onPress}>
      <LinkText>{linkText}</LinkText>
      <Image source={chevron} />
    </LinkContainer>
  </Container>
)

NavLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
