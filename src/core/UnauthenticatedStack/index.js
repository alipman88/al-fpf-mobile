import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { ProfileTypes } from './SignUp/ProfileTypes'

export const UnauthenticatedStack = createStackNavigator(
  {
    Login,
    ProfileTypes
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
