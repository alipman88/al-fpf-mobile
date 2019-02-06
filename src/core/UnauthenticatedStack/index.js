import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'

export const UnauthenticatedStack = createStackNavigator(
  {
    Login
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    }
  }
)
