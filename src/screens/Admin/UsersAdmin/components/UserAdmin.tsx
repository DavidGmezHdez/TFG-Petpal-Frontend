import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';

type Props = {
  user: IUser;
  removeUser: (userId: string) => void;
};

export const UserAdmin = ({user, removeUser}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.data}>
        {user.image ? (
          <Image source={{uri: user.image}} style={styles.images} />
        ) : null}
      </View>
      <View style={styles.dataText}>
        <Text large>Nombre: {user.name}</Text>
        <Text large>Email: {user.email}</Text>
        <Text large>Rol: {user.rol}</Text>
      </View>
      <View style={styles.data}>
        <Pressable
          style={styles.updatePressable}
          onPress={() => removeUser(user._id)}>
          <Text large style={generalStyles.textStyle}>
            Borrar Usuario
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderColor: colors.green,
    borderWidth: 5,
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  dataText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '40%',
  },
  updatePressable: {
    backgroundColor: colors.error,
  },
  images: {
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    height: '100%',
    width: '90%',
    maxHeight: 350 * px,
    maxWidth: 350 * px,
  },
});
