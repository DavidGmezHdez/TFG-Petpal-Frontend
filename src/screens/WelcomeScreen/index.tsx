import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'welcome'>;

type WelcomeScreenProps = {
  navigation: NavigationStackProp['navigation'];
};

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
