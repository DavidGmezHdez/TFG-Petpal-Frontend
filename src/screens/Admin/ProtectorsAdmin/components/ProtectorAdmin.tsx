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
  promoteProtector: (userId: string, promoted: boolean) => void;
};

export const ProtectorAdmin = ({user, removeUser, promoteProtector}: Props) => {
  const promText = user.promoted
    ? 'Quitar alta de protectora'
    : 'Dar de alta protectora';
  console.log(user);
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
        <Text large>Teléfono contacto: {user.contactPhone}</Text>
        <Text large>Region: {user.region}</Text>
        <Text large>Direccion: {user.direction}</Text>
      </View>

      <View style={styles.data}>
        <Pressable
          style={styles.updatePressable}
          onPress={() => promoteProtector(user._id, !user.promoted)}>
          <Text large style={generalStyles.textStyle}>
            {promText}
          </Text>
        </Pressable>
        <Pressable
          style={styles.deletePressable}
          onPress={() => removeUser(user._id)}>
          <Text large style={generalStyles.textStyle}>
            Borrar Protectora
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
  deletePressable: {
    backgroundColor: colors.error,
  },
  updatePressable: {
    backgroundColor: colors.primaryLight,
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
