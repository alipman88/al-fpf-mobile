import { createStackNavigator } from 'react-navigation'
import React from 'react'

import profileIcon from '@assets/images/global-assets/top-nav-elements/profile-icon.png'
import trioBirds from '@assets/images/global-assets/trio-birds.png'
import { TopNavIcon } from './TopNavIcon'

export const createStackNavForTab = screens =>
  createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerLeft: <TopNavIcon source={trioBirds} width={36} height={26} />,
      headerRight: <TopNavIcon source={profileIcon} width={16} height={17} />,
      headerTitleStyle: {
        fontFamily: 'ProximaNova-SemiBold',
        fontSize: 14,
        color: '#355768',
        textAlign: 'center',
        flex: 1
      }
    }
  })
