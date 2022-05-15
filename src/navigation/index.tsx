import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackNavigationScreens} from './stackNavigationScreens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const Navigation = () => {
  const headerLeftComponentMenu = () => {
    return <></>;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {StackNavigationScreens.map((item, idx) => (
          <Stack.Screen
            key={`stack_item-${idx + 1}`}
            name={item.name}
            component={item.component}
            options={{
              headerLeft: item.headerLeft || headerLeftComponentMenu,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
