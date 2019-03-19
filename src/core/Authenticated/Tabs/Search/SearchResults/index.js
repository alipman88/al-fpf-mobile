import { connect } from 'react-redux'
import { appSettings } from '@common/appSettings'
import { SearchResults as SearchResultsComponent } from './SearchResults'

const mapStateToProps = state => ({
  postTruncateLength: appSettings.selectors.getPostTruncateLength(state)
})

export const SearchResults = connect(mapStateToProps)(SearchResultsComponent)
