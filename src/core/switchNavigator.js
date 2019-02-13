import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { SplashScreen } from './SplashScreen'
import { UnauthenticatedStack } from './UnauthenticatedStack'
import { AuthenticatedStack } from './AuthenticatedStack'

const SwitchNavigator = createSwitchNavigator(
  {
    SplashScreen,
    UnauthenticatedStack,
    AuthenticatedStack
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export const SwitchNavigatorContainer = createAppContainer(SwitchNavigator)
