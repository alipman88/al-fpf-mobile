import { connect } from 'react-redux'

import { areas } from '@common/areas'
import { appSettings } from '@common/appSettings'
import { Search as SearchScreen } from './Search'

import { search } from './actions'
import { searchHistory } from './SearchHistory/slice'

const mapStateToProps = state => ({
  areas: areas.selectors.getFullAreasList(state),
  categories: appSettings.selectors.getCategories(state)
})

export const Search = connect(
  mapStateToProps,
  { search, addSearchToHistory: searchHistory.actions.addSearchToHistory }
)(SearchScreen)
