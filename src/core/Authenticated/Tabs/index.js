import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import get from 'lodash/get'

import { Compose } from './Compose'
import { Forum } from './Forum'
import { Calendar } from './Calendar'
import { Search } from './Search'
import { Directory } from './Directory'

import { NavIcon } from './NavIcon'
import { NavLabel } from './NavLabel'

import composeActive from '@assets/images/global-assets/main-navigation/compose-active.png'
import composeDefault from '@assets/images/global-assets/main-navigation/compose-default.png'
import directoryActive from '@assets/images/global-assets/main-navigation/directory-active.png'
import directoryDefault from '@assets/images/global-assets/main-navigation/directory-default.png'
import homeActive from '@assets/images/global-assets/main-navigation/home-active.png'
import homeDefault from '@assets/images/global-assets/main-navigation/home-default.png'
import calendarActive from '@assets/images/global-assets/main-navigation/calendar-active.png'
import calendarDefault from '@assets/images/global-assets/main-navigation/calendar-default.png'
import searchActive from '@assets/images/global-assets/main-navigation/search-active.png'
import searchDefault from '@assets/images/global-assets/main-navigation/search-default.png'

// When someone is on the Forum screen we would like to scroll them back to the
// top when they press the Forum tab again (and same with the Search screen). In order
// to do this we must expose a reference to the ScrollView and a scroll function to the navigator.
// This is Adapted from https://medium.com/@dblazeski/react-navigation-call-screen-method-on-tab-bar-press-or-focus-5b93d844e18e
// with a standard interface scrollRef and scrollToTop. These are defined inside the components on mount and update.
//
// This appears to be default behavior in react-navigation 5.x: https://reactnavigation.org/docs/bottom-tab-navigator#tabpress
// We should upgrade at some point: See #172505832 and https://reactnavigation.org/docs/upgrading-from-4.x
const scrollTopIfFocused = ({ navigation, defaultHandler }) => {
  if (navigation && navigation.isFocused()) {
    const screenParams = getScreenRegisteredParams(navigation.state)

    if (screenParams && typeof screenParams.scrollToTop === 'function') {
      screenParams.scrollToTop(screenParams.scrollRef)
    }
  }

  defaultHandler()
}

const getScreenRegisteredParams = (navState) => {
  // When we use stack navigators.
  // Also needed for react-navigation@2
  const { routes, index, params } = navState

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredParams(routes[index])
  }
  // When we have the final screen params
  else {
    return params
  }
}

export const Tabs = createBottomTabNavigator(
  {
    Forum: {
      screen: Forum,
      navigationOptions: () => ({
        title: 'Forum',
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel allowFontScaling={false} focused={focused}>
            Forum
          </NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? homeActive : homeDefault} />
        ),
        tabBarOnPress: scrollTopIfFocused,
      }),
    },
    Compose: {
      screen: Compose,
      navigationOptions: () => ({
        title: 'Compose',
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel allowFontScaling={false} focused={focused}>
            Compose
          </NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? composeActive : composeDefault} />
        ),
      }),
    },
    Search: {
      screen: Search,
      navigationOptions: () => ({
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel allowFontScaling={false} focused={focused}>
            Search
          </NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? searchActive : searchDefault} />
        ),
        tabBarOnPress: scrollTopIfFocused,
      }),
    },
    Directory: {
      screen: Directory,
      navigationOptions: () => ({
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel allowFontScaling={false} focused={focused}>
            Directory
          </NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? directoryActive : directoryDefault} />
        ),
      }),
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: () => ({
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel allowFontScaling={false} focused={focused}>
            Calendar
          </NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? calendarActive : calendarDefault} />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Forum',
    tabBarOptions: {
      tabStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
    },
  }
)

Tabs.navigationOptions = ({ navigation }) => {
  const { params, routeName } = navigation.state.routes[navigation.state.index]

  // To set a non-static value for any of these options, call navigation.setParams, e.g.:
  //
  //    this.props.navigation.setParams({
  //      navTitle: areaName,
  //    })

  const headerTitle = get(params, 'navTitle', routeName)
  const headerLeft = get(params, 'headerLeft')

  const options = { headerTitle }

  if (headerLeft !== undefined) {
    options.headerLeft = headerLeft
  }

  return options
}
