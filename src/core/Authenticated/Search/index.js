import { connect } from 'react-redux'

import { createStackNavForTab } from '../createStackNavForTab'
import { Search as SearchScreen } from './Search'

import { search } from './actions'

export const Search = createStackNavForTab({
  Search: connect(
    null,
    { search }
  )(SearchScreen)
})
