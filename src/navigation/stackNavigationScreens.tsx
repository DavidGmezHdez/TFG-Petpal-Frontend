import React from 'react';
import {Button} from 'react-native';
import {WelcomeScreen} from 'screens/WelcomeScreen';

export const StackNavigationScreens = [
  {
    name: 'WelcomeScreen',
    component: WelcomeScreen,
    headerLeft: () => <Button title="Back" color={'#4r43'} />,
  },
];
