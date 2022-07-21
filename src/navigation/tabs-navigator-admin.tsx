import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FeedAdmin} from '@screens/Admin/FeedAdmin';
import {PetsAdmin} from '@screens/Admin/PetsAdmin';
import {ProfileAdmin} from '@screens/Admin/ProfileAdmin';
import {EventsAdmin} from '@screens/Admin/EventsAdmin';
import {UsersAdmin} from '@screens/Admin/UsersAdmin';
import {ProtectorsAdmin} from '@screens/Admin/ProtectorsAdmin';

export const TabsNavigatorAdmin = () => {
  const Tab = createMaterialBottomTabNavigator();

  //Disables hardware back button android
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={'feed'}
      activeColor={'white'}
      inactiveColor={'gray'}
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{backgroundColor: 'tomato'}}>
      <>
        <Tab.Screen
          name="Tablón"
          component={FeedAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Eventos"
          component={EventsAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons
                name="camera-party-mode"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Mascotas"
          component={PetsAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons name="dog" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Usuarios"
          component={UsersAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Protectoras"
          component={ProtectorsAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons
                name="office-building-cog"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={ProfileAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons name="turtle" color={color} size={26} />
            ),
          }}
        />
      </>
    </Tab.Navigator>
  );
};
