import React from 'react'
import PropTypes from 'prop-types'

import { Pill, CategoryText } from './styledComponents'

export const PostCategory = ({ children }) => (
  <Pill>
    <CategoryText>{children}</CategoryText>
  </Pill>
)

PostCategory.propTypes = {
  children: PropTypes.string.isRequired
}
