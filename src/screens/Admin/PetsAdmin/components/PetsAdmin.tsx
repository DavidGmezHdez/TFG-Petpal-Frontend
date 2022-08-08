import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {useDispatch} from 'react-redux';
import {deletePet} from '@redux/pets/pets_actions';
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
      <Text large>Nombre: {pet.name}</Text>
      <Text large>Tipo: {pet.type}</Text>
      <Text large>Sexo: {pet.sex}</Text>
      <Text large>Edad: {pet.age}</Text>
      <Text large>Tamaño: {pet.size}</Text>
      <Text large>Raza: {pet.race}</Text>
      <Text large>Descripcion: {pet.description}</Text>
      {pet.image && pet.image.length ? (
        <Image source={{uri: pet.image[0]}} style={styles.images} />
      ) : null}
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={removePet}>
        <Text large style={styles.textStyle}>
          Borrar mascota
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
