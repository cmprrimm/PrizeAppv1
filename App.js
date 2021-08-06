
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { firebaseConfig } from './database/firebase.js';
import AuthNavigator from './screens/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: HomeScreen,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);
