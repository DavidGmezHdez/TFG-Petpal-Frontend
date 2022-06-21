import {Login} from '@screens/Login';
import {RegisterUser} from '@screens/RegisterUser';
import {WelcomeScreen} from '@screens/WelcomeScreen';
import {RegisterProtector} from '@screens/RegisterProtector';
import {TabsNavigator} from './tabs-navigator';

export const StackNavigationScreens = [
  {
    name: 'welcome',
    component: WelcomeScreen,
  },
  {
    name: 'registerUser',
    component: RegisterUser,
  },
  {
    name: 'registerProtector',
    component: RegisterProtector,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'tabs_navigator',
    component: TabsNavigator,
  },
];
