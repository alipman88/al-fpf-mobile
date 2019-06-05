import React from 'react'
import PropTypes from 'prop-types'

import { Pill, CategoryText } from './styledComponents'

export const PostCategory = ({ children, dark }) => (
  <Pill dark={dark}>
    <CategoryText dark={dark}>{children}</CategoryText>
  </Pill>
)

PostCategory.propTypes = {
  children: PropTypes.string.isRequired,
  dark: PropTypes.bool
}

PostCategory.defaultProps = {
  dark: false
}
