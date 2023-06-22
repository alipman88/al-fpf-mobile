import React from 'react'
import PropTypes from 'prop-types'
import { Container, ContainerText } from './styledComponents'

export const BadgeText = ({ bg, ...props }) => {
  return <ContainerText bg={bg} numberOfLines={1} {...props} />
}

BadgeText.propTypes = {
  bg: PropTypes.string,
}

export const Badge = ({ bg, ...props }) => {
  return <Container bg={bg} {...props} />
}

Badge.propTypes = {
  /**
   * The visual style of the badge
   *
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  bg: PropTypes.string,
}
