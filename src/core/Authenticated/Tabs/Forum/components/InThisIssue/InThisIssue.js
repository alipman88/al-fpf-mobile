import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Heading,
  ListItem,
  ListItemBullet,
  ListItemText,
} from './styledComponents'

export const InThisIssue = ({ headlines, number, posts }) => (
  <Container>
    <Heading>In this issue #{number}</Heading>
    {headlines.map((headline, i) => (
      <ListItem key={`headline_${i}`}>
        <ListItemBullet>{'\u2022'}</ListItemBullet>
        <ListItemText numberOfLines={1} selectable={true}>
          {headline}
        </ListItemText>
      </ListItem>
    ))}
    {posts.length > headlines.length && (
      <ListItem key={`headline_${headlines.length + 1}`}>
        <ListItemText numberOfLines={1}>...and more!</ListItemText>
      </ListItem>
    )}
  </Container>
)

InThisIssue.propTypes = {
  headlines: PropTypes.array,
  number: PropTypes.number,
  posts: PropTypes.array,
}

InThisIssue.defaultProps = {
  headlines: [],
  posts: [],
}
