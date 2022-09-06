import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';
import {px} from '@utils/Constants';
type Props = {
  pet: IPet;
  handleShowPet: (pet: IPet) => void;
};

export const Pet = ({pet, handleShowPet}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.data}>
        {pet.image && pet.image.length ? (
          <Image source={{uri: pet.image[0]}} style={styles.images} />
        ) : null}
      </View>
      <View style={styles.dataText}>
        <Text large>Nombre: {pet.name}</Text>
        <Text large>Tipo: {pet.type}</Text>
        <Text large>Sexo: {pet.sex}</Text>
        <Text large>Edad: {pet.age} años</Text>
        <Text large>Tamaño: {pet.size}</Text>
        <Text large>Raza: {pet.race}</Text>
      </View>
      <View style={styles.data}>
        <Pressable
          style={styles.updatePressable}
          onPress={() => handleShowPet(pet)}>
          <Text large style={generalStyles.textStyle}>
            Mostrar datos contacto
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
