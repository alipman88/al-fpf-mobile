import { connect } from 'react-redux'
import { Compose as ComposeScreen } from './Compose'
import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { submitPost } from './actions'
import { appSettings } from '@common/appSettings'

const mapStateToProps = state => ({
  areas: areas.selectors.getAreas(state),
  currentAreaId: areas.selectors.getCurrentAreaId(state),
  profiles: profile.selectors.getProfiles(state),
  loading: profile.selectors.getLoading(state),
  currentProfileId: profile.selectors.getCurrentProfileId(state),
  categories: appSettings.selectors.getCategories(state)
})

export const Compose = connect(
  mapStateToProps,
  {
    submitPost
  }
)(ComposeScreen)
