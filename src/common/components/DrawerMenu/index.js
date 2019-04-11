import { connect } from 'react-redux'

import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { DrawerMenu as DrawerMenuComponent } from './DrawerMenu'

const mapStateToProps = state => ({
  areas: areas.selectors.getFullAreasList(state),
  currentAreaId: areas.selectors.getCurrentAreaId(state),
  currentProfile: profile.selectors.getCurrentProfile(state),
  profiles: profile.selectors.getProfiles(state)
})

export const DrawerMenu = connect(
  mapStateToProps,
  {
    setCurrentAreaId: areas.actions.setCurrentAreaId,
    setCurrentProfileId: profile.actions.setCurrentProfileId
  }
)(DrawerMenuComponent)
