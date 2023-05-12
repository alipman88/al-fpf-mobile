import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Settings } from './Settings'
import { Tabs } from './Tabs'

const Stack = createNativeStackNavigator()

export function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName='Tabs'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Tabs' component={Tabs} />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
