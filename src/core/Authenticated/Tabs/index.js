import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Compose } from './Compose'
import { Forum } from './Forum'
import { Calendar } from './Calendar'
import { Search } from './Search'
import { Directory } from './Directory'

import { Config } from '@fpf/common/config'
import profileIcon from '@fpf/assets/images/global-assets/top-nav-elements/profile-icon.png'
import { DrawerNavIcon } from '../DrawerNavIcon'
import { TopNavIcon } from '../TopNavIcon'
import { NavIcon } from './NavIcon'

import composeActive from '@fpf/assets/images/global-assets/main-navigation/compose-active.png'
import composeDefault from '@fpf/assets/images/global-assets/main-navigation/compose-default.png'
import directoryActive from '@fpf/assets/images/global-assets/main-navigation/directory-active.png'
import directoryDefault from '@fpf/assets/images/global-assets/main-navigation/directory-default.png'
import homeActive from '@fpf/assets/images/global-assets/main-navigation/home-active.png'
import homeDefault from '@fpf/assets/images/global-assets/main-navigation/home-default.png'
import calendarActive from '@fpf/assets/images/global-assets/main-navigation/calendar-active.png'
import calendarDefault from '@fpf/assets/images/global-assets/main-navigation/calendar-default.png'
import searchActive from '@fpf/assets/images/global-assets/main-navigation/search-active.png'
import searchDefault from '@fpf/assets/images/global-assets/main-navigation/search-default.png'

let headerBackgroundForEnv = ['development', 'staging'].includes(
  Config.ENVIRONMENT,
)
  ? '#ffff00'
  : null

const Tab = createBottomTabNavigator()

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName='Forum'
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#D77400',
        tabBarAllowFontScaling: false,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        headerRight: () => (
          <TopNavIcon
            source={profileIcon}
            width={26}
            height={22}
            onPress={() => {
              navigation.navigate('Settings')
            }}
          />
        ),
        headerTitleStyle: {
          fontFamily: 'ProximaNova-SemiBold',
          fontSize: 16,
          color: '#355768',
          backgroundColor: headerBackgroundForEnv,
        },
      })}
    >
      <Tab.Screen
        name='Forum'
        component={Forum}
        options={({ navigation }) => ({
          title: 'Forum',
          headerLeft: () => (
            <DrawerNavIcon
              onPress={() => {
                navigation.navigate('Forum', {
                  sourceUrl: `/forum?cache-bust=${Date.now()}`,
                })
              }}
            />
          ),
          tabBarLabel: 'Forum',
          tabBarIcon: ({ focused }) => (
            <NavIcon source={focused ? homeActive : homeDefault} />
          ),
        })}
      />
      <Tab.Screen
        name='Calendar'
        component={Calendar}
        options={() => ({
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <NavIcon source={focused ? calendarActive : calendarDefault} />
          ),
        })}
      />
      <Tab.Screen
        name='Directory'
        component={Directory}
        options={() => ({
          tabBarLabel: 'Directory',
          tabBarIcon: ({ focused }) => (
            <NavIcon source={focused ? directoryActive : directoryDefault} />
          ),
        })}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={() => ({
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused }) => (
            <NavIcon source={focused ? searchActive : searchDefault} />
          ),
        })}
      />
      <Tab.Screen
        name='Compose'
        component={Compose}
        options={({ navigation }) => ({
          title: 'Compose',
          headerLeft: () => (
            <DrawerNavIcon
              onPress={() => {
                navigation.navigate('Forum', {
                  sourceUrl: `/forum?cache-bust=${Date.now()}`,
                })
              }}
            />
          ),
          tabBarLabel: 'Compose',
          tabBarIcon: ({ focused }) => (
            <NavIcon source={focused ? composeActive : composeDefault} />
          ),
        })}
      />
    </Tab.Navigator>
  )
}
