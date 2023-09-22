import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import ForgotPassword from './Auth/ForgotPassword'
import SplashScreen from './Splash'

import UserAgreement from './UserAgreement'
import PrivacyPolicy from './PrivacyPolicy'
import FAQ from './FAQ'

import Welcome from './User/Welcome'
import Main from './User/Main'
import DrawerContent from '../components/Drawer';

const ScreenOptions = { animation: 'fade', headerShown: false }
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" drawerContent={DrawerContent}>
      <Drawer.Screen name="Main" component={Main} options={ScreenOptions} />
      <Drawer.Screen name="UserAgreement" component={UserAgreement} options={ScreenOptions} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={ScreenOptions} />
      <Drawer.Screen name="FAQ" component={FAQ} options={ScreenOptions} />
    </Drawer.Navigator>
  )
}

const Routes = (props) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={ScreenOptions} />
      
      <Stack.Screen name="SignIn" component={SignIn} options={ScreenOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={ScreenOptions} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ScreenOptions} />
      <Stack.Screen name="UserAgreement" component={UserAgreement} options={ScreenOptions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={ScreenOptions} />

      <Stack.Screen name="HomeScreen" component={DrawerNavigator} options={ScreenOptions} />

      <Stack.Screen name="Welcome" component={Welcome} options={ScreenOptions} />
    </Stack.Navigator>
  );
}

export default Routes;