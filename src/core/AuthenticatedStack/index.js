import { createStackNavigator } from 'react-navigation'
import { Home } from './Home'

export const AuthenticatedStack = createStackNavigator(
  {
    Home
  },
  {
    initialRouteName: 'Home',
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
