import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Config from 'react-native-config';
type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'welcome'>;

type WelcomeScreenProps = {
  navigation: NavigationStackProp['navigation'];
};

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('login');
        }}>
        <Text>Hola</Text>
        <Text>{Config.API_URL_LOCAL}</Text>
      </TouchableOpacity>
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
