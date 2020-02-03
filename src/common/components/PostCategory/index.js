import React from 'react'
import PropTypes from 'prop-types'

import { Pill, CategoryText } from './styledComponents'

export const PostCategory = ({ children, labelStyle }) => (
  <Pill labelStyle={labelStyle}>
    <CategoryText labelStyle={labelStyle}>{children}</CategoryText>
  </Pill>
)

PostCategory.propTypes = {
  children: PropTypes.string.isRequired,
  labelStyle: PropTypes.string
}

PostCategory.defaultProps = {
  labelStyle: 'light_grey'
}
