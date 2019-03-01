import React from 'react'
import PropTypes from 'prop-types'

import { Container, Label } from './styledComponents'

export const Pill = ({ children, style }) => (
  <Container style={style}>
    <Label>{children}</Label>
  </Container>
)

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}
