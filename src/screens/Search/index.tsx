import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'search'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Search = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
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
