import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {WelcomeScreen} from '@screens/WelcomeScreen';
import {RegisterUser} from '@screens/RegisterUser';
import {RegisterProtector} from '@screens/RegisterProtector';
import {Login} from '@screens/Login';
import {CreatePetScreen} from '@screens/CreatePet';
import {EditProfileScreen} from '@screens/EditProfile';
import {TabsNavigator} from './tabs-navigator';
import {TabsNavigatorAdmin} from './tabs-navigator-admin';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';

const Stack = createStackNavigator();

export const Navigation = () => {
  const token = useSelector((state: RootState) => state.user.token);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={token ? 'tabs_navigator' : 'welcome'}
        screenOptions={{
          animationEnabled: false,
          gestureEnabled: false,
        }}>
        <Stack.Screen
          name={'welcome'}
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'registerUser'}
          component={RegisterUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'registerProtector'}
          component={RegisterProtector}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'tabs_navigator'}
          component={TabsNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'createPets'}
          component={CreatePetScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'editProfile'}
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'tabs_navigator_admin'}
          component={TabsNavigatorAdmin}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
