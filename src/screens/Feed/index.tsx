import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch} from 'react-redux';
import {logout} from '@redux/user/user_actions';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Feed = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text>Feed</Text>

      <Button title="Logout" onPress={_handleLogout} />
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
