import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Compose } from './Compose'
import { Forum } from './Forum'
import { Calendar } from './Calendar'
import { Search } from './Search'
import { Directory } from './Directory'

import { Config } from '@common/config'
import profileIcon from '@assets/images/global-assets/top-nav-elements/profile-icon.png'
import { DrawerNavIcon } from '../DrawerNavIcon'
import { TopNavIcon } from '../TopNavIcon'
import { NavIcon } from './NavIcon'
import { NavLabel } from './NavLabel'
import { SideDrawerMenu } from '@components/DrawerMenu'

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

let headerBackgroundForEnv = ['development', 'staging'].includes(
  Config.ENVIRONMENT
)
  ? '#ffff00'
  : null

const Tab = createBottomTabNavigator()

export function Tabs() {
  const [drawerEnabled, setDrawerEnabled] = React.useState(true)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <SideDrawerMenu
      enabled={drawerEnabled}
      open={drawerOpen}
      setOpen={setDrawerOpen}
    >
      <Tab.Navigator
        initialRouteName='Forum'
        screenOptions={({ navigation }) => ({
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
          listeners={{ tabPress: () => setDrawerEnabled(true) }}
          options={() => ({
            title: 'Forum',
            headerLeft: () => <DrawerNavIcon setOpen={setDrawerOpen} />,
            tabBarLabel: ({ focused }) => (
              <NavLabel allowFontScaling={false} focused={focused}>
                Forum
              </NavLabel>
            ),
            tabBarIcon: ({ focused }) => (
              <NavIcon source={focused ? homeActive : homeDefault} />
            ),
          })}
        />
        <Tab.Screen
          name='Compose'
          component={Compose}
          listeners={{
            tabPress: () => setDrawerEnabled(true),
          }}
          options={() => ({
            title: 'Compose',
            headerLeft: () => <DrawerNavIcon setOpen={setDrawerOpen} />,
            tabBarLabel: ({ focused }) => (
              <NavLabel allowFontScaling={false} focused={focused}>
                Compose
              </NavLabel>
            ),
            tabBarIcon: ({ focused }) => (
              <NavIcon source={focused ? composeActive : composeDefault} />
            ),
          })}
        />
        <Tab.Screen
          name='Search'
          component={Search}
          listeners={{
            tabPress: () => setDrawerEnabled(false),
          }}
          options={() => ({
            tabBarLabel: ({ focused }) => (
              <NavLabel allowFontScaling={false} focused={focused}>
                Search
              </NavLabel>
            ),
            tabBarIcon: ({ focused }) => (
              <NavIcon source={focused ? searchActive : searchDefault} />
            ),
          })}
        />
        <Tab.Screen
          name='Directory'
          component={Directory}
          listeners={{
            tabPress: () => setDrawerEnabled(false),
          }}
          options={() => ({
            tabBarLabel: ({ focused }) => (
              <NavLabel allowFontScaling={false} focused={focused}>
                Directory
              </NavLabel>
            ),
            tabBarIcon: ({ focused }) => (
              <NavIcon source={focused ? directoryActive : directoryDefault} />
            ),
          })}
        />
        <Tab.Screen
          name='Calendar'
          component={Calendar}
          listeners={{
            tabPress: () => setDrawerEnabled(false),
          }}
          options={() => ({
            tabBarLabel: ({ focused }) => (
              <NavLabel allowFontScaling={false} focused={focused}>
                Calendar
              </NavLabel>
            ),
            tabBarIcon: ({ focused }) => (
              <NavIcon source={focused ? calendarActive : calendarDefault} />
            ),
          })}
        />
      </Tab.Navigator>
    </SideDrawerMenu>
  )
}
