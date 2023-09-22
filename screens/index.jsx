import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import ForgotPassword from './Auth/ForgotPassword'
import SplashScreen from './Splash'

import UserAgreement from './UserAgreement'
import PrivacyPolicy from './PrivacyPolicy'

import Welcome from './User/Welcome'

import { useEffect } from 'react'

const Routes = (props) => {

  const ScreenOptions = { animation: 'fade', headerShown: false }

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={ScreenOptions} />
      
      <Stack.Screen name="SignIn" component={SignIn} options={ScreenOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={ScreenOptions} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ScreenOptions} />

      <Stack.Screen name="UserAgreement" component={UserAgreement} options={ScreenOptions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={ScreenOptions} />

      <Stack.Screen name="Welcome" component={Welcome} options={ScreenOptions} />
    </Stack.Navigator>
  );
}

export default Routes;
