import { connect } from 'react-redux'

import { areas } from '@common/areas'
import { appSettings } from '@common/appSettings'
import { createStackNavForTab } from '../createStackNavForTab'
import { Search as SearchScreen } from './Search'

import { search } from './actions'
import { searchHistory } from './SearchHistory/slice'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state),
  categories: appSettings.selectors.getCategories(state)
})

export const Search = createStackNavForTab({
  Search: connect(
    mapStateToProps,
    { search, addSearchToHistory: searchHistory.actions.addSearchToHistory }
  )(SearchScreen)
})
