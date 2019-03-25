import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { Welcome } from './Welcome'
import { Map } from './SignUp/Map'
import { ProfileTypes } from './SignUp/ProfileTypes'

export const UnauthenticatedStack = createStackNavigator(
  {
    Welcome,
    Login,
    Map,
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
