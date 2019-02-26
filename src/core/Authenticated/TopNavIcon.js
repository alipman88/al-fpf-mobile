import React from 'react'
import PropTypes from 'prop-types'
import { IconContainer, Icon } from './styledComponents'

export const TopNavIcon = ({ onPress, width, height, source }) => (
  <IconContainer onPress={onPress}>
    <Icon source={source} width={width} height={height} />
  </IconContainer>
)

TopNavIcon.propTypes = {
  height: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  width: PropTypes.number.isRequired
}
