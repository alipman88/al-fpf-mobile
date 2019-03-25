import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { MapScreen } from './SignUp/MapScreen'
import { Welcome } from './Welcome'
import { ProfileTypes } from './SignUp/ProfileTypes'

export const UnauthenticatedStack = createStackNavigator(
  {
    Welcome,
    Login,
    MapScreen,
    ProfileTypes
  },
  {
    initialRouteName: 'Welcome',
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
