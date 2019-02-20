import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

export const NavIcon = ({ source }) => (
  <Image
    source={source}
    style={{
      width: 20,
      height: 20,
      marginTop: 4
    }}
  />
)

NavIcon.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
