import { connect } from 'react-redux'

import { currentUser } from '@common/currentUser'
import { Search as SearchScreen } from './Search'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Search = connect(mapStateToProps, {})(SearchScreen)
