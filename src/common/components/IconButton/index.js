import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@components/Button'

export const IconButton = ({ disabled, width, onPress, color, iconName }) => {
  return (
    <Button
      disabled={disabled}
      width={width}
      onPress={onPress}
      color={color}
      iconNameLeft={iconName}
      iconLeft={true}
      bgColor={'rgba(0,0,0,0)'}
      hasBorder={false}
    />
  )
}

IconButton.propTypes = {
  disabled: PropTypes.bool,
  width: PropTypes.number,
  color: PropTypes.string,
  iconName: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}
