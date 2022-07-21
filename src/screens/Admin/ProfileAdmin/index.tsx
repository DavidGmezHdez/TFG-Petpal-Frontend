import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';
import {Text} from '@components/TextWrapper';
import {px} from '@utils/Constants';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const ProfileAdmin = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={_handleLogout}>
        <Text large style={styles.textStyle}>
          Cerrar Sesión
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
