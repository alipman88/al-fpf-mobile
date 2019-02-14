import { connect } from 'react-redux'
import { Forum as ForumComponent } from './Forum'
import { currentUser } from '@common/currentUser'
import { areas, getAreas } from '@common/areas'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state)
})

export const Forum = connect(
  mapStateToProps,
  { setAccessToken: currentUser.actions.setAccessToken, getAreas }
)(ForumComponent)
