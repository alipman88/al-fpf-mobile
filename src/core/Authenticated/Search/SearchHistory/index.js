import { connect } from 'react-redux'

import { searchHistory } from './slice'
import { SearchHistory as SearchHistoryComponent } from './SearchHistory'

const mapStateToProps = state => ({
  history: searchHistory.selectors.getHistory(state)
})

export const SearchHistory = connect(mapStateToProps)(SearchHistoryComponent)
