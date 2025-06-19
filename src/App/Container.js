import React from 'react'
import { Linking } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

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

/**
 * Given a notification's data object, returns a URL to route to via react-navigation.
 *
 * @param {RemoteMessage object} notification message
 * @returns {String | null}
 */
export function buildDeepLinkFromNotification(message) {
  let data = message?.data || {}

  // The Rails app sends notifications with a structure like:
  // data: {
  //   payload: '{ "area_id": 123 }'
  // }
  //
  // But sometimes Firebase seems to automatically decode this JSON string payload
  // and hoist it to the message data level. This code is meant to be flexible
  // enough to handle either situation.
  if (data.payload) {
    data = data.payload

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (error) {
        console.error('Could not parse notification payload:', error)
      }
    }
  }

  const { area_id, issue_number } = data

  if (area_id && issue_number) {
    return `https://frontporchforum.com/${area_id}/forum/archive/${issue_number}?cache-bust=${Date.now()}`
  }

  return null
}

function ContainerComponent({ accessToken, handleNavigationChange }) {
  const navigationRef = useNavigationContainerRef()
  const routeNameRef = React.useRef()

  const linking = {
    prefixes: [
      'https://frontporchforum.com',
      'https://staging.frontporchforum.com',
      'https://staging2.frontporchforum.com',
    ],
    config: {
      screens: {
        Tabs: {
          screens: {
            Calendar: {
              path: 'calendar',
              alias: [':area/calendar', 'calendar/events/:event_id'],
            },
            Compose: {
              path: 'compose',
              alias: ['compose/:area_slug'],
            },
            Directory: {
              path: 'directory',
              alias: [
                'directory/categories/:category_slug?',
                'directory/favorites',
                'd/:profile_slug',
              ],
            },
            Forum: {
              path: 'forum',
              alias: [
                ':area/forum',
                ':area/forum/archive',
                ':area/forum/archive/:number',
              ],
            },
            Search: {
              path: 'search',
            },
          },
        },
      },
    },

    // Configure deep linking and notification routing support
    //
    // https://reactnavigation.org/docs/navigation-container/#linkinggetinitialurl
    // https://rnfirebase.io/messaging/notifications#handling-interaction
    async getInitialURL() {
      const url = await Linking.getInitialURL()
      if (typeof url === 'string') {
        return url
      }

      // getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification()
      const notifUrl = buildDeepLinkFromNotification(message)
      if (notifUrl) {
        return notifUrl
      }
    },
    subscribe(listener) {
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        listener(url)
      })

      // onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(
        async (message) => {
          const notifUrl = buildDeepLinkFromNotification(message)
          if (notifUrl) {
            listener(notifUrl)
          }
        },
      )

      return () => {
        linkingSubscription.remove()
        unsubscribe()
      }
    },
  }

  return (
    <NavigationContainer
      navigationInChildEnabled
      linking={linking}
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
