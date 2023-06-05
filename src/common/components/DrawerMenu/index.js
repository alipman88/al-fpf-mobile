import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SideMenu from 'react-native-side-menu-updated'

import { getDimensions, isTabletWidth } from '@common/utils/size'
import { areas } from '@common/areas'
import { profile } from '@common/profile'
import { DrawerMenu as DrawerMenuComponent } from './DrawerMenu'

const mapStateToProps = (state) => ({
  areas: areas.selectors.getFullAreasList(state),
  currentAreaId: areas.selectors.getCurrentAreaId(state),
  currentProfile: profile.selectors.getCurrentProfile(state),
  profiles: profile.selectors.getAvailableProfiles(state),
})

export const DrawerMenu = connect(mapStateToProps, {
  setCurrentAreaId: areas.actions.setCurrentAreaId,
  setCurrentProfileId: profile.actions.setCurrentProfileId,
})(DrawerMenuComponent)

/**
 * Embed the DrawerMenu inside a react native SideMenu component.
 *
 * @param {boolean} enabled - if false, open menu gesture listening is disabled.
 * @param {boolean} open - if true, the menu is rendered as open.
 * @param {function} setOpen - callback method when the drawer is set to open or closed.
 */
export function SideDrawerMenu({ children, enabled, open, setOpen }) {
  return (
    <SideMenu
      menu={<DrawerMenu setOpen={setOpen} />}
      isOpen={open}
      onChange={(open) => setOpen(open)}
      openMenuOffset={
        isTabletWidth()
          ? (getDimensions().width * 1) / 3
          : (getDimensions().width * 2) / 3
      }
      bounceBackOnOverdraw={false}
      disableGestures={!enabled}
    >
      {children}
    </SideMenu>
  )
}

SideDrawerMenu.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
}
