import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { SettingsIndex } from './SettingsIndex'

export const Settings = createStackNavigator(
  {
    SettingsIndex
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            console.log('goBack', navigation.state.key)
            // navigation.goBack(navigation.state.key)
            navigation.pop()
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      )
    })
  }
)
