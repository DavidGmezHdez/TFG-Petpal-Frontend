import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {Feed, Events, Pets, Profile} from '..';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TabsNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  const rol = useSelector((state: RootState) => state.user.user.rol);

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
      {rol === 'Usuario' ? (
        <>
          <Tab.Screen
            name="Tablón"
            component={Feed}
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
            component={Events}
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
            component={Pets}
            options={{
              tabBarIcon: ({color}: any) => (
                <MaterialCommunityIcons name="dog" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: ({color}: any) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Tablón"
            component={Feed}
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
            name="Perfil"
            component={Profile}
            options={{
              tabBarIcon: ({color}: any) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
