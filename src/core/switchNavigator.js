import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { SplashScreen } from './SplashScreen'
import { UnauthenticatedStack } from './UnauthenticatedStack'

const SwitchNavigator = createSwitchNavigator(
  {
    SplashScreen,
    UnauthenticatedStack
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export const SwitchNavigatorContainer = createAppContainer(SwitchNavigator)
