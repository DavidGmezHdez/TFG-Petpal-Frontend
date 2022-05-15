import {Login} from 'screens/Login';
import {Register} from 'screens/Register';
import {WelcomeScreen} from 'screens/WelcomeScreen';
import {TabsNavigator} from './tabs-navigator';

export const StackNavigationScreens = [
  {
    name: 'welcome',
    component: WelcomeScreen,
  },
  {
    name: 'register',
    component: Register,
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
