import { createStackNavigator } from 'react-navigation'
import React from 'react'

import { createResetStackTo } from '@common/utils/navigation'
import profileIcon from '@assets/images/global-assets/top-nav-elements/profile-icon.png'
import { DrawerNavIcon } from './DrawerNavIcon'
import { TopNavIcon } from './TopNavIcon'
import { store } from '@common/store'
import { resetAction } from '@common/resetAction'

export const createStackNavForTab = screens =>
  createStackNavigator(screens, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerNavIcon />,
      headerRight: (
        <TopNavIcon
          source={profileIcon}
          width={16}
          height={17}
          onPress={() => {
            store.dispatch(resetAction())
            navigation.navigate('SplashScreen')
            navigation.dispatch(createResetStackTo('Login'))
          }}
        />
      ),
      headerTitleStyle: {
        fontFamily: 'ProximaNova-SemiBold',
        fontSize: 14,
        color: '#355768',
        textAlign: 'center',
        flex: 1
      }
    })
  })
