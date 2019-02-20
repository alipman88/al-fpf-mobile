import { connect } from 'react-redux'
import { createStackNavForTab } from '../createStackNavForTab'
import { Forum as ForumScreen } from './Forum'
import { currentUser } from '@common/currentUser'
import { areas, getAreas } from '@common/areas'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state)
})

export const Forum = createStackNavForTab({
  Forum: connect(
    mapStateToProps,
    { setAccessToken: currentUser.actions.setAccessToken, getAreas }
  )(ForumScreen)
})
