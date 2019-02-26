import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components/Text'

export const OtherIssues = ({ issues }) => (
  <Text>These will be some issues: {issues.map(i => `${i.id}, `)}</Text>
)

OtherIssues.propTypes = {
  issues: PropTypes.array.isRequired
}
