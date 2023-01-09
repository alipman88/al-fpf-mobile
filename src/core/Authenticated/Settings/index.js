import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

import { Account } from './Account'
import { Profile } from './Profile'
import { SettingsIndex } from './SettingsIndex'
import { Subscription } from './Subscription'

import { CloseText } from './styledComponents'

export const Settings = createStackNavigator(
  {
    Account,
    Profile,
    SettingsIndex,
    Subscription,
  },
  {
    initialRouteName: 'SettingsIndex',
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.dismiss()
          }}
        >
          <CloseText allowFontScaling={false}>Close</CloseText>
        </TouchableOpacity>
      ),
      headerTitle: 'Account & Help',
      headerTitleStyle: {
        fontFamily: 'ProximaNova-SemiBold',
        fontSize: 18,
        color: '#355768',
        textAlign: 'center',
        flex: 1,
      },
    }),
  }
)
