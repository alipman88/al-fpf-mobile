import React from 'react'
import PropTypes from 'prop-types'

import { Container, ContentWrapper } from './styledComponents'

export const Modal = ({ children }) => (
  <Container>
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
)

Modal.propTypes = {
  children: PropTypes.node.isRequired
}
