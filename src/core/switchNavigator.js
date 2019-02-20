import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { SplashScreen } from './SplashScreen'
import { UnauthenticatedStack } from './UnauthenticatedStack'
import { Authenticated } from './Authenticated'

const SwitchNavigator = createSwitchNavigator(
  {
    SplashScreen,
    UnauthenticatedStack,
    Authenticated
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export const SwitchNavigatorContainer = createAppContainer(SwitchNavigator)
