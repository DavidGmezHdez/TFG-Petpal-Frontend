import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {Feed, Events, Pets, Profile} from '..';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchUser} from '@redux/user/user_actions';
import {useInterval} from '@utils/hooks/useInterval';
import {RootState} from 'redux/store';
import {colors} from '@utils/Colors';

export const TabsNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  const user = useSelector((state: RootState) => state.user.user);
  const rol = user ? user.rol : '';
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const dispatch = useDispatch<any>();

  //Disables hardware back button android
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  // Every 60 seconds we update the user data
  useInterval(async () => {
    if (user && isAuthenticated) {
      console.log('tabs user');
      await dispatch(fetchUser(user._id, user.rol));
    }
  }, 1000 * 60);

  return (
    <Tab.Navigator
      initialRouteName={'feed'}
      activeColor={'white'}
      inactiveColor={'gray'}
      barStyle={{backgroundColor: colors.springGreen}}>
      {rol === 'Protectora' ? (
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
      )}
    </Tab.Navigator>
  );
};
