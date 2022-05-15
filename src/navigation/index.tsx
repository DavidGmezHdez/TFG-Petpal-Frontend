import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackNavigationScreens} from './stackNavigationScreens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {StackNavigationScreens.map((item, idx) => (
          <Stack.Screen
            key={`stack_item-${idx + 1}`}
            name={item.name}
            component={item.component}
            options={{headerShown: false}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
