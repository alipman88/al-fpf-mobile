import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu-updated'
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from '@react-navigation/native'

import { currentUser } from '@common/currentUser'
import { DrawerContext } from './context'
import { DrawerMenu } from '@components/DrawerMenu'
import { RootStack } from '@core/rootStack'
import { Spinner } from './Spinner'
import { getDimensions, isTabletWidth } from '@common/utils/size'

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
}

function ContainerComponent({ accessToken, handleNavigationChange }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const navigationRef = useNavigationContainerRef()
  const routeNameRef = React.useRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      // onReady and onStateChange are used for screen tracking:
      // https://reactnavigation.org/docs/screen-tracking/
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name
      }}
      onStateChange={async (state) => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName

          handleNavigationChange(currentRouteName)
        }
      }}
    >
      <DrawerContext.Provider
        value={{ open: drawerOpen, setDrawerOpenState: setDrawerOpen }}
      >
        <SideMenu
          menu={<DrawerMenu />}
          isOpen={drawerOpen}
          onChange={(open) => setDrawerOpen(open)}
          openMenuOffset={
            isTabletWidth()
              ? (getDimensions().width * 1) / 3
              : (getDimensions().width * 2) / 3
          }
          bounceBackOnOverdraw={false}
          disableGestures={!accessToken}
        >
          <Spinner />
          <RootStack />
        </SideMenu>
      </DrawerContext.Provider>
    </NavigationContainer>
  )
}

ContainerComponent.propTypes = {
  accessToken: PropTypes.string,
  handleNavigationChange: PropTypes.func,
}

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Container = connect(mapStateToProps)(ContainerComponent)
