import { createNativeStackNavigator } from '@react-navigation/native-stack'

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

const Stack = createNativeStackNavigator()

export function UnauthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen
        name='MapScreen'
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='ProfileTypes' component={ProfileTypes} />
      <Stack.Screen name='Address' component={Address} />
      <Stack.Screen name='EmailVerification' component={EmailVerification} />
      <Stack.Screen name='BasicInfo' component={BasicInfo} />
      <Stack.Screen name='GovernmentInfo' component={GovernmentInfo} />
      <Stack.Screen name='Waitlist' component={Waitlist} />
      <Stack.Screen name='WaitlistSuccess' component={WaitlistSuccess} />
      <Stack.Screen name='BusinessInfo' component={BusinessInfo} />
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
    </Stack.Navigator>
  )
}
