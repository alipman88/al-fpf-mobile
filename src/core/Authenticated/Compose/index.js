import { connect } from 'react-redux'
import { createStackNavForTab } from '../createStackNavForTab'
import { Compose as ComposeScreen } from './Compose'
import { areas } from '@common/areas'
import { getProfiles, profile } from '@common/profile'
import { submitPost } from './actions'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state),
  currentAreaId: areas.selectors.getCurrentAreaId(state),
  profiles: profile.selectors.getProfiles(state),
  loading: profile.selectors.getLoading(state),
  currentProfileId: profile.selectors.getCurrentProfileId(state)
})

export const Compose = createStackNavForTab({
  Compose: connect(
    mapStateToProps,
    {
      getProfiles,
      submitPost
    }
  )(ComposeScreen)
})
