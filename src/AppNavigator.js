import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import LandingScreen from './screens/LandingScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppNavigator = createStackNavigator({
  Landing: {
    screen: LandingScreen
  },  
  SignIn: {
      screen: SignInScreen
  },
  SignUp: {
     screen: SignUpScreen
  },
  Profile: {
    screen: ProfileScreen
 },
},
  {
    headerLayoutPreset: 'center',
  }

);

export default createAppContainer(AppNavigator);