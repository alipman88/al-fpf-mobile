import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import { Compose } from './Compose'
import { Forum } from './Forum/components/Forum'
import { More } from './More'
import { Search } from './Search'

import { NavIcon } from './NavIcon'
import { NavLabel } from './NavLabel'

import composeActive from '@assets/images/global-assets/main-navigation/compose-active.png'
import composeDefault from '@assets/images/global-assets/main-navigation/compose-default.png'
import homeActive from '@assets/images/global-assets/main-navigation/home-active.png'
import homeDefault from '@assets/images/global-assets/main-navigation/home-default.png'
import moreActive from '@assets/images/global-assets/main-navigation/more-active.png'
import moreDefault from '@assets/images/global-assets/main-navigation/more-default.png'
import searchActive from '@assets/images/global-assets/main-navigation/search-active.png'
import searchDefault from '@assets/images/global-assets/main-navigation/search-default.png'

export const Authenticated = createBottomTabNavigator(
  {
    Forum: {
      screen: Forum,
      navigationOptions: () => ({
        title: 'Forum',
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel focused={focused}>Forum</NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? homeActive : homeDefault} />
        )
      })
    },
    Compose: {
      screen: Compose,
      navigationOptions: () => ({
        title: 'Compose',
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel focused={focused}>Compose</NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? composeActive : composeDefault} />
        )
      })
    },
    Search: {
      screen: Search,
      navigationOptions: () => ({
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel focused={focused}>Search</NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? searchActive : searchDefault} />
        )
      })
    },
    More: {
      screen: More,
      navigationOptions: () => ({
        /* eslint-disable-next-line react/prop-types */
        tabBarLabel: ({ focused }) => (
          <NavLabel focused={focused}>More</NavLabel>
        ),
        /* eslint-disable-next-line react/prop-types */
        tabBarIcon: ({ focused }) => (
          <NavIcon source={focused ? moreActive : moreDefault} />
        )
      })
    }
  },
  {
    initialRouteName: 'Forum'
  }
)
