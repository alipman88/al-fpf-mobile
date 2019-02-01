import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { SplashScreen } from './SplashScreen'

const SwitchNavigator = createSwitchNavigator(
  {
    SplashScreen
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export const SwitchNavigatorContainer = createAppContainer(SwitchNavigator)
