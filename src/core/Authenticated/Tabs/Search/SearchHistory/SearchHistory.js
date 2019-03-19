import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { Container, Divider, Header, Link } from './styledComponents'

export const SearchHistory = ({ history, onEntryPress }) => {
  if (history.length === 0) {
    return null
  }

  return (
    <Container>
      <Header>Search History</Header>
      {history.map((entry, i) => (
        <React.Fragment key={entry}>
          <TouchableOpacity onPress={() => onEntryPress(entry)}>
            <Link>{entry}</Link>
          </TouchableOpacity>
          {i < history.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Container>
  )
}

SearchHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onEntryPress: PropTypes.func.isRequired
}
