import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FeedAdmin} from '@screens/Admin/FeedAdmin';
import {EventAdmin} from '@screens/Admin/EventsAdmin/components/EventAdmin';
import {PetsAdmin} from '@screens/Admin/PetsAdmin';
import {UserAdmin} from '@screens/Admin/UsersAdmin/components/UserAdmin';
import {ProtectorAdmin} from '@screens/Admin/ProtectorsAdmin/components/ProtectorAdmin';
import {ProfileAdmin} from '@screens/Admin/ProfileAdmin';

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
          component={EventAdmin}
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
          component={UserAdmin}
          options={{
            tabBarIcon: ({color}: any) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Protectoras"
          component={ProtectorAdmin}
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
