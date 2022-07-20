import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FeedAdmin} from '@screens/Admin/FeedAdmin';
import {EventAdmin} from '@screens/Admin/EventsAdmin/components/EventAdmin';

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
      </>
    </Tab.Navigator>
  );
};
