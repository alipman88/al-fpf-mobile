import { connect } from 'react-redux'
import { currentUser } from '@fpf/common/currentUser'
import { Directory as DirectoryScreen } from './Directory'

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Directory = connect(mapStateToProps)(DirectoryScreen)
