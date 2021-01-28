import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import {
  Container,
  Divider,
  Link,
  SearchHistoryToggle,
  SearchHistoryText,
} from './styledComponents'

export class SearchHistory extends React.Component {
  state = {
    showSearchHistory: false,
  }
  render() {
    const { history, onEntryPress, clearSearchHistory } = this.props

    if (history.length === 0) {
      return null
    }

    return (
      <Container>
        <SearchHistoryToggle
          onPress={() =>
            this.setState((state) => ({
              showSearchHistory: !state.showSearchHistory,
            }))
          }
        >
          <SearchHistoryText>
            {this.state.showSearchHistory ? 'Hide' : 'Show'} Search History
          </SearchHistoryText>
        </SearchHistoryToggle>
        {this.state.showSearchHistory &&
          history.map((entry, i) => (
            <React.Fragment key={entry}>
              <TouchableOpacity onPress={() => onEntryPress(entry)}>
                <Link>{entry.keyword}</Link>
              </TouchableOpacity>
              {i < history.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        {this.state.showSearchHistory && history.length > 0 && (
          <SearchHistoryToggle onPress={async () => clearSearchHistory()}>
            <SearchHistoryText>Clear Search History</SearchHistoryText>
          </SearchHistoryToggle>
        )}
      </Container>
    )
  }
}

SearchHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onEntryPress: PropTypes.func.isRequired,
  clearSearchHistory: PropTypes.func.isRequired,
}
