import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {useDispatch} from 'react-redux';
import {deletePet} from '@redux/pets/pets_actions';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';
type Props = {
  pet: IPet;
};

export const PetAdmin = ({pet}: Props) => {
  const dispatch = useDispatch<any>();

  const removePet = async () => {
    await dispatch(deletePet(pet._id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        {pet.image && pet.image.length ? (
          <Image source={{uri: pet.image[0]}} style={styles.images} />
        ) : null}
      </View>
      <View style={styles.dataText}>
        <Text xlarge>Nombre: {pet.name}</Text>
        <Text xlarge>Tipo: {pet.type}</Text>
        <Text xlarge>Sexo: {pet.sex}</Text>
        <Text xlarge>Edad: {pet.age} años</Text>
        <Text xlarge>Tamaño: {pet.size}</Text>
        <Text xlarge>Raza: {pet.race}</Text>
        <Text xlarge>Descripcion: {pet.description}</Text>
        <Text xlarge>Nombre protectora: {pet?.protector.name}</Text>
        <Text xlarge>Telefono de contacto: {pet?.protector.contactPhone}</Text>
        <Text xlarge>Direccion: {pet?.protector.direction}</Text>
        <Text xlarge>Provincia: {pet?.protector.region}</Text>
        <Text xlarge>Imagenes:</Text>
      </View>
      <View style={styles.data}>
        <Pressable style={styles.updatePressable} onPress={removePet}>
          <Text large style={generalStyles.textStyle}>
            Borrar mascota
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
