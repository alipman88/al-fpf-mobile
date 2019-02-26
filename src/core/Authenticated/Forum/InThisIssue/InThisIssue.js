import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Heading,
  ListItem,
  ListItemBullet,
  ListItemText
} from './styledComponents'

export const InThisIssue = ({ headlines }) => (
  <Container>
    <Heading>In this issue</Heading>
    {headlines.map((headline, i) => (
      <ListItem key={`headline_${i}`}>
        <ListItemBullet>{'\u2022'}</ListItemBullet>
        <ListItemText numberOfLines={1}>{headline}</ListItemText>
      </ListItem>
    ))}
  </Container>
)

InThisIssue.propTypes = {
  headlines: PropTypes.array
}

InThisIssue.defaultProps = {
  headlines: []
}
