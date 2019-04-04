import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { Account } from './Account'
import { Profile } from './Profile'
import { SettingsIndex } from './SettingsIndex'

import { CloseText } from './styledComponents'

export const Settings = createStackNavigator(
  {
    Account,
    Profile,
    SettingsIndex
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
          <CloseText>Close</CloseText>
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        fontFamily: 'ProximaNova-SemiBold',
        fontSize: 14,
        color: '#355768',
        textAlign: 'center',
        flex: 1
      }
    })
  }
)
