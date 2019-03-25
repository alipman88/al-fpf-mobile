import React from 'react'
import PropTypes from 'prop-types'
import { Container, Label } from './styledComponents'

export const Pill = ({ children, style, image }) => (
  <Container style={style}>
    <Label>{children}</Label>
    {image}
  </Container>
)

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  image: PropTypes.node
}
