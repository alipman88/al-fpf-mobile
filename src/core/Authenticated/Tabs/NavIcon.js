import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

export const NavIcon = ({ source }) => (
  <Image
    source={source}
    style={{
      width: 35,
      height: 20,
      marginTop: 4,
      resizeMode: 'contain',
    }}
  />
)

NavIcon.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
