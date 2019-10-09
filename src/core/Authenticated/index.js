import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import { Config } from '@common/config'
import profileIcon from '@assets/images/global-assets/top-nav-elements/profile-icon.png'
import { DrawerNavIcon } from './DrawerNavIcon'
import { TopNavIcon } from './TopNavIcon'
import { Settings } from './Settings'
import { Tabs } from './Tabs'

let headerBackgroundForEnv = ['development', 'staging'].includes(
  Config.ENVIRONMENT
)
  ? '#ffff00'
  : ''

export const Authenticated = createStackNavigator(
  {
    Tabs,
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Tabs',
    // this needs to be set to modal in order for Settings to come up as a modal
    // if regular stack nav is required, it should be nested in this one for those set of screens
    mode: 'modal',
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerNavIcon />,
      headerRight: (
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
        textAlign: 'center',
        flex: 1
      }
    })
  }
)
