import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from '@react-navigation/native'

import { currentUser } from '@fpf/common/currentUser'
import { RootStack } from '@fpf/core/rootStack'
import { Spinner } from './Spinner'

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
}

function ContainerComponent({ accessToken, handleNavigationChange }) {
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
      <Spinner />
      <RootStack />
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
