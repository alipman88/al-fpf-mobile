import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackActions } from '@react-navigation/native'
import PropTypes from 'prop-types'

import { Account } from './Account'
import { Profile } from './Profile'
import { SettingsIndex } from './SettingsIndex'
import { Subscription } from './Subscription'

import { CloseText } from './styledComponents'

const Stack = createNativeStackNavigator()

export function Settings({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName='SettingsIndex'
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'ProximaNova-SemiBold',
          fontSize: 16,
          color: '#355768',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.pop(1))
            }}
          >
            <CloseText allowFontScaling={false}>Close</CloseText>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name='Account'
        component={Account}
        options={{ title: 'My Account' }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ title: 'My Profile' }}
      />
      <Stack.Screen
        name='SettingsIndex'
        component={SettingsIndex}
        options={{ title: 'Account & Help' }}
      />
      <Stack.Screen
        name='Subscription'
        component={Subscription}
        options={{ title: 'Upgrade FPF Plan' }}
      />
    </Stack.Navigator>
  )
}

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
}
