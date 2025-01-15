import React from 'react'
import PropTypes from 'prop-types'
import grassImage from '@fpf/assets/images/fpf-grass.png'

import { GrassContainer, GrassBorder } from './styledComponents'

export const Grass = ({ content, height, resizeMode }) => {
  return (
    <GrassContainer height={height}>
      {content}
      <GrassBorder source={grassImage} resizeMode={resizeMode} />
    </GrassContainer>
  )
}

Grass.propTypes = {
  content: PropTypes.node,
  height: PropTypes.number,
  resizeMode: PropTypes.string,
}
