import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './LoadingScreen.js';
import SignUpScreen from './SignUpScreen.js';
import SignInScreen from './SignInScreen.js';
const AuthNavigator = createSwitchNavigator(
    {
        Loading: { screen: LoadingScreen },
        SignIn: { screen: SignInScreen },
        SignUp: { screen: SignUpScreen },

    },
    { initialRouteName: 'Loading' }
);
export default AuthNavigator;