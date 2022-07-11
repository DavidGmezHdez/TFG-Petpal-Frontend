import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {Feed, Events, Pets, Profile} from '..';

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
    <Tab.Navigator initialRouteName={'feed'}>
      {rol === 'Usuario' ? (
        <>
          <Tab.Screen name="Tablón" component={Feed} options={{}} />
          <Tab.Screen name="Eventos" component={Events} options={{}} />
          <Tab.Screen name="Mascotas" component={Pets} options={{}} />
          <Tab.Screen name="Perfil" component={Profile} options={{}} />
        </>
      ) : (
        <>
          <Tab.Screen name="Tablón" component={Feed} options={{}} />
          <Tab.Screen name="Perfil" component={Profile} options={{}} />
        </>
      )}
    </Tab.Navigator>
  );
};
