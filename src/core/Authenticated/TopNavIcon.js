import React from 'react'
import PropTypes from 'prop-types'
import { IconContainer, Icon } from './styledComponents'

export const TopNavIcon = ({ width, height, source }) => (
  <IconContainer>
    <Icon source={source} width={width} height={height} />
  </IconContainer>
)

TopNavIcon.propTypes = {
  height: PropTypes.number.isRequired,
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  width: PropTypes.number.isRequired
}
