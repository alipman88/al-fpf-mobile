import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { MapScreen } from './SignUp/MapScreen'
import { Welcome } from './Welcome'
import { ProfileTypes } from './SignUp/ProfileTypes'
import { Address } from './SignUp/Address'
import { EmailVerification } from './SignUp/EmailVerification'
import { BasicInfo } from './SignUp/BasicInfo'
import { Waitlist } from './SignUp/Waitlist'
import { WaitlistSuccess } from './SignUp/WaitlistSuccess'

export const UnauthenticatedStack = createStackNavigator(
  {
    Welcome,
    Login,
    MapScreen,
    ProfileTypes,
    Address,
    EmailVerification,
    BasicInfo,
    Waitlist,
    WaitlistSuccess
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
