import { createStackNavigator } from 'react-navigation'

import { Login } from './Login'
import { MapScreen } from './SignUp/MapScreen'
import { Welcome } from './Welcome'
import { ProfileTypes } from './SignUp/ProfileTypes'
import { Address } from './SignUp/Address'
import { EmailVerification } from './SignUp/EmailVerification'
import { BasicInfo } from './SignUp/BasicInfo'
import { GovernmentInfo } from './SignUp/GovernmentInfo'
import { Waitlist } from './SignUp/Waitlist'
import { WaitlistSuccess } from './SignUp/WaitlistSuccess'
import { BusinessInfo } from './SignUp/BusinessInfo'
import { CreateAccount } from './SignUp/CreateAccount'

export const UnauthenticatedStack = createStackNavigator(
  {
    Login,
    MapScreen,
    ProfileTypes,
    Address,
    EmailVerification,
    BasicInfo,
    GovernmentInfo,
    Waitlist,
    WaitlistSuccess,
    BusinessInfo,
    CreateAccount,
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerTransparent: true,
      header: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    }
  }
)
