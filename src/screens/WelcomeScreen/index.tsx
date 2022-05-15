import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';

export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
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
