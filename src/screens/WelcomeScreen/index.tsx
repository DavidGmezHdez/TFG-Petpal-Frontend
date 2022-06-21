import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import {persistor} from '@redux/store';
type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'welcome'>;

type WelcomeScreenProps = {
  navigation: NavigationStackProp['navigation'];
};

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
      <Text>{Config.API_URL_LOCAL}</Text>
      <TouchableOpacity
        onPress={() => {
          persistor.purge();
        }}>
        <Text>Purge</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('login');
        }}>
        <Text>Bienvenido</Text>
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
