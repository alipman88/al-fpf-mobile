import React from 'react'
import PropTypes from 'prop-types'

import trioBirds from '@fpf/assets/images/global-assets/trio-birds.png'
import { TopNavIcon } from './TopNavIcon'

export const DrawerNavIcon = ({ onPress }) => {
  return (
    <TopNavIcon
      source={trioBirds}
      width={36}
      height={26}
      onPress={() => {
        onPress(true)
      }}
    />
  )
}

DrawerNavIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
}
