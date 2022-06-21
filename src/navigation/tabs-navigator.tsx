import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Feed} from '@screens/Feed';
import {Search} from '@screens/Search';
import {Profile} from '@screens/Profile';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';

export const TabsNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  const rol = useSelector((state: RootState) => state.user.rol);

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
          <Tab.Screen name="feed" component={Feed} options={{}} />
          <Tab.Screen name="search" component={Search} options={{}} />
          <Tab.Screen name="profile" component={Profile} options={{}} />
        </>
      ) : (
        <>
          <Tab.Screen name="feed" component={Feed} options={{}} />
          <Tab.Screen name="profile" component={Profile} options={{}} />
        </>
      )}
    </Tab.Navigator>
  );
};
