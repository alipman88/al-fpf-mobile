import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { Map } from './SignUp/Map'
import { ProfileTypes } from './SignUp/ProfileTypes'

export const UnauthenticatedStack = createStackNavigator(
  {
    Login,
    Map,
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
