import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';

type Props = {
  user: IUser;
  removeUser: (userId: string) => void;
};

export const ProtectorAdmin = ({user, removeUser}: Props) => {
  return (
    <View style={styles.container}>
      <Text large>Nombre: {user.name}</Text>
      <Text large>Email: {user.email}</Text>
      <Text large>Rol: {user.rol}</Text>
      <Text large>Teléfono contacto: {user.contactPhone}</Text>
      {user.image ? (
        <Image source={{uri: user.image}} style={styles.images} />
      ) : null}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => removeUser(user._id)}>
        <Text large style={styles.textStyle}>
          Borrar Usuario
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
