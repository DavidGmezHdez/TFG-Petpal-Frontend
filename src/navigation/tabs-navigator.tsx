import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Feed} from 'screens/Feed';
import {Search} from 'screens/Search';
import {Profile} from 'screens/Profile';

export const TabsNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  //Disables hardware back button android
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Tab.Navigator initialRouteName="feed">
      <Tab.Screen name="feed" component={Feed} options={{}} />
      <Tab.Screen name="search" component={Search} options={{}} />
      <Tab.Screen name="profile" component={Profile} options={{}} />
    </Tab.Navigator>
  );
};
